import React, { useState, useEffect, useRef } from 'react';
import { Brain, Zap, Activity, RefreshCw, Maximize, Minimize, Play, Pause } from 'lucide-react';

const AdvancedNeuralNetworkVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [complexity, setComplexity] = useState(3);
  const [activeNeurons, setActiveNeurons] = useState(0);
  const [networkActivity, setNetworkActivity] = useState(0);
  const [threatDetection, setThreatDetection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [neuralLayers, setNeuralLayers] = useState([
    { name: 'Input Layer', neurons: 12, color: '#3b82f6' },
    { name: 'Voice Analysis', neurons: 24, color: '#8b5cf6' },
    { name: 'Pose Detection', neurons: 32, color: '#ec4899' },
    { name: 'Face Recognition', neurons: 28, color: '#10b981' },
    { name: 'Biometric Processing', neurons: 20, color: '#f97316' },
    { name: 'Threat Assessment', neurons: 16, color: '#ef4444' },
    { name: 'Output Layer', neurons: 8, color: '#6366f1' }
  ]);

  // Animation frame reference
  const animationRef = useRef<number>();
  
  // Network state
  const [networkState, setNetworkState] = useState({
    nodes: [] as any[],
    connections: [] as any[]
  });

  useEffect(() => {
    // Initialize the neural network visualization
    initializeNetwork();
    
    // Start the animation loop
    if (isAnimating) {
      startAnimation();
    }
    
    // Update stats periodically
    const statsInterval = setInterval(() => {
      updateNetworkStats();
    }, 1000);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(statsInterval);
    };
  }, [complexity, isAnimating]);

  const initializeNetwork = () => {
    // Create nodes for each layer
    const nodes: any[] = [];
    const connections: any[] = [];
    
    let xOffset = 0;
    const canvasWidth = canvasRef.current?.width || 800;
    const canvasHeight = canvasRef.current?.height || 400;
    const layerSpacing = canvasWidth / (neuralLayers.length + 1);
    
    neuralLayers.forEach((layer, layerIndex) => {
      xOffset += layerSpacing;
      
      // Adjust number of visible neurons based on complexity
      const visibleNeurons = Math.min(layer.neurons, 4 + complexity * 2);
      
      for (let i = 0; i < visibleNeurons; i++) {
        const yOffset = (canvasHeight / (visibleNeurons + 1)) * (i + 1);
        
        nodes.push({
          id: `${layerIndex}-${i}`,
          x: xOffset,
          y: yOffset,
          radius: 5 + Math.random() * 3,
          color: layer.color,
          activity: Math.random(),
          layer: layerIndex
        });
        
        // Create connections to previous layer
        if (layerIndex > 0) {
          const prevLayer = neuralLayers[layerIndex - 1];
          const prevLayerVisibleNeurons = Math.min(prevLayer.neurons, 4 + complexity * 2);
          
          for (let j = 0; j < prevLayerVisibleNeurons; j++) {
            if (Math.random() > 0.3) { // 70% chance of connection
              connections.push({
                from: `${layerIndex-1}-${j}`,
                to: `${layerIndex}-${i}`,
                weight: Math.random(),
                active: Math.random() > 0.5
              });
            }
          }
        }
      }
    });
    
    setNetworkState({ nodes, connections });
  };

  const startAnimation = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      if (!isAnimating) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update network state
      const updatedNodes = networkState.nodes.map(node => ({
        ...node,
        activity: Math.max(0, Math.min(1, node.activity + (Math.random() - 0.5) * 0.1))
      }));
      
      const updatedConnections = networkState.connections.map(conn => ({
        ...conn,
        active: Math.random() > 0.3,
        weight: Math.max(0.1, Math.min(1, conn.weight + (Math.random() - 0.5) * 0.05))
      }));
      
      setNetworkState({
        nodes: updatedNodes,
        connections: updatedConnections
      });
      
      // Draw connections
      updatedConnections.forEach(conn => {
        const fromNode = updatedNodes.find(n => n.id === conn.from);
        const toNode = updatedNodes.find(n => n.id === conn.to);
        
        if (fromNode && toNode) {
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          
          const alpha = conn.active ? 0.2 + conn.weight * 0.8 : 0.1;
          ctx.strokeStyle = `rgba(${conn.active ? '65, 105, 225' : '200, 200, 200'}, ${alpha})`;
          ctx.lineWidth = conn.weight * 2;
          ctx.stroke();
        }
      });
      
      // Draw nodes
      updatedNodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        // Create gradient for active nodes
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 2
        );
        
        const baseColor = node.color;
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = baseColor;
        ctx.fill();
        
        // Add glow for active neurons
        if (node.activity > 0.6) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * (1 + node.activity), 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };

  const updateNetworkStats = () => {
    // Calculate active neurons
    const activeCount = networkState.nodes.filter(node => node.activity > 0.6).length;
    setActiveNeurons(activeCount);
    
    // Calculate overall network activity
    const totalActivity = networkState.nodes.reduce((sum, node) => sum + node.activity, 0);
    const avgActivity = totalActivity / networkState.nodes.length;
    setNetworkActivity(avgActivity);
    
    // Simulate threat detection
    const newThreatLevel = Math.random();
    setThreatDetection(prev => prev * 0.7 + newThreatLevel * 0.3); // Smooth changes
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    
    if (!isAnimating) {
      startAnimation();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const toggleFullscreen = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    if (!isFullscreen) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };

  const handleComplexityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplexity(Number(e.target.value));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Neural Network Visualizer</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleAnimation}
              className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              {isAnimating ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Play</span>
                </>
              )}
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              {isFullscreen ? (
                <>
                  <Minimize className="w-4 h-4" />
                  <span>Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize className="w-4 h-4" />
                  <span>Fullscreen</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Neural Network Visualization */}
        <div className="bg-gray-900 rounded-xl overflow-hidden mb-6">
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={400}
            className="w-full h-[400px]"
          />
        </div>

        {/* Network Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Network Complexity</h3>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={complexity}
                onChange={handleComplexityChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700">Level {complexity}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Simple</span>
              <span>Complex</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Network Activity</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Active Neurons</span>
                  <span className="text-sm font-medium text-blue-600">{activeNeurons} / {networkState.nodes.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(activeNeurons / networkState.nodes.length) * 100}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Network Activity</span>
                  <span className="text-sm font-medium text-purple-600">{(networkActivity * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${networkActivity * 100}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Threat Detection</span>
                  <span className="text-sm font-medium text-red-600">{(threatDetection * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${threatDetection * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer Information */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Neural Network Architecture</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Layer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Neurons
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Function
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {neuralLayers.map((layer, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: layer.color }}></div>
                        <span className="text-sm font-medium text-gray-900">{layer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {layer.neurons}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index === 0 ? 'Data Input' : 
                       index === neuralLayers.length - 1 ? 'Threat Classification' : 
                       'Feature Extraction'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Information */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-start space-x-3">
            <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">About This Visualization</h4>
              <p className="text-sm text-blue-700 mt-1">
                This is a simplified visualization of Guardian Sentinel's neural network architecture. The actual system uses a complex multi-modal deep learning model with over 500 million parameters, trained on diverse safety scenarios. The network processes audio, visual, biometric, and environmental data simultaneously to detect threats in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedNeuralNetworkVisualizer;