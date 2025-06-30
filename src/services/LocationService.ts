import { UserLocation, DangerZone } from '../types';

export class LocationService {
  private static instance: LocationService;
  private watchId: number | null = null;
  private currentLocation: UserLocation | null = null;
  private locationCallbacks: ((location: UserLocation) => void)[] = [];

  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  startTracking(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 15000, // Increased timeout to 15 seconds
        maximumAge: 0
      };

      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location: UserLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date()
          };

          this.currentLocation = location;
          this.notifyLocationUpdate(location);
          resolve();
        },
        (error) => {
          console.error('Location error:', error);
          // Start mock tracking for demo but still reject the promise
          this.startMockTracking();
          reject(error);
        },
        options
      );
    });
  }

  private startMockTracking(): void {
    // Mock location that moves around NYC for demo
    let lat = 40.7128;
    let lng = -74.0060;

    setInterval(() => {
      lat += (Math.random() - 0.5) * 0.001;
      lng += (Math.random() - 0.5) * 0.001;

      const location: UserLocation = {
        lat,
        lng,
        accuracy: 10,
        timestamp: new Date(),
        address: this.generateMockAddress(lat, lng)
      };

      this.currentLocation = location;
      this.notifyLocationUpdate(location);
    }, 2000);
  }

  private generateMockAddress(lat: number, lng: number): string {
    const streets = ['Broadway', 'Park Ave', 'Madison Ave', '5th Ave', 'Lexington Ave'];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const number = Math.floor(Math.random() * 999) + 1;
    return `${number} ${street}, New York, NY`;
  }

  getCurrentLocation(): UserLocation | null {
    return this.currentLocation;
  }

  onLocationUpdate(callback: (location: UserLocation) => void): void {
    this.locationCallbacks.push(callback);
  }

  private notifyLocationUpdate(location: UserLocation): void {
    this.locationCallbacks.forEach(callback => callback(location));
  }

  isInDangerZone(location: UserLocation, dangerZones: DangerZone[]): DangerZone | null {
    for (const zone of dangerZones) {
      const distance = this.calculateDistance(
        location.lat,
        location.lng,
        zone.center.lat,
        zone.center.lng
      );

      if (distance <= zone.radius) {
        return zone;
      }
    }
    return null;
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  stopTracking(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }
}