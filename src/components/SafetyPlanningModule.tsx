import React, { useState } from 'react';
import { ClipboardList, Map, Shield, Clock, Calendar, Check, Plus, Trash2, Edit, Save, X } from 'lucide-react';

interface SafetyPlan {
  id: string;
  name: string;
  description: string;
  steps: SafetyStep[];
  contacts: EmergencyContact[];
  safeLocations: SafeLocation[];
  createdAt: Date;
  updatedAt: Date;
}

interface SafetyStep {
  id: string;
  order: number;
  description: string;
  completed: boolean;
}

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  priority: number;
}

interface SafeLocation {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  notes: string;
}

const SafetyPlanningModule: React.FC = () => {
  const [activePlan, setActivePlan] = useState<SafetyPlan | null>(null);
  const [plans, setPlans] = useState<SafetyPlan[]>([
    {
      id: '1',
      name: 'School Safety Plan',
      description: 'Safety procedures for school and commute',
      steps: [
        { id: '1-1', order: 1, description: 'Check in with guardian upon arrival', completed: false },
        { id: '1-2', order: 2, description: 'Use buddy system when moving between classes', completed: false },
        { id: '1-3', order: 3, description: 'Stay in designated safe areas during breaks', completed: false },
        { id: '1-4', order: 4, description: 'Use monitored route for commute home', completed: false }
      ],
      contacts: [
        { id: '1-c1', name: 'Mom', relationship: 'Parent', phone: '555-0123', priority: 1 },
        { id: '1-c2', name: 'Dad', relationship: 'Parent', phone: '555-0124', priority: 2 },
        { id: '1-c3', name: 'School Security', relationship: 'Authority', phone: '555-9876', priority: 3 }
      ],
      safeLocations: [
        { 
          id: '1-l1', 
          name: 'School Office', 
          address: '123 Education St', 
          coordinates: { lat: 40.7128, lng: -74.0060 },
          notes: 'Open 7:30 AM - 4:30 PM on weekdays'
        },
        { 
          id: '1-l2', 
          name: 'Library', 
          address: '123 Education St', 
          coordinates: { lat: 40.7128, lng: -74.0060 },
          notes: 'Librarian on duty during school hours'
        }
      ],
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-03-10')
    },
    {
      id: '2',
      name: 'Evening Out Safety Plan',
      description: 'Safety procedures for social outings',
      steps: [
        { id: '2-1', order: 1, description: 'Share location with trusted contacts', completed: false },
        { id: '2-2', order: 2, description: 'Check in every 2 hours', completed: false },
        { id: '2-3', order: 3, description: 'Use designated rideshare services only', completed: false },
        { id: '2-4', order: 4, description: 'Avoid isolated areas after dark', completed: false }
      ],
      contacts: [
        { id: '2-c1', name: 'Roommate', relationship: 'Roommate', phone: '555-5678', priority: 1 },
        { id: '2-c2', name: 'Sister', relationship: 'Family', phone: '555-8765', priority: 2 }
      ],
      safeLocations: [
        { 
          id: '2-l1', 
          name: 'Downtown Police Station', 
          address: '456 Safety Ave', 
          coordinates: { lat: 40.7589, lng: -73.9851 },
          notes: 'Open 24/7'
        },
        { 
          id: '2-l2', 
          name: 'City Hospital', 
          address: '789 Health Blvd', 
          coordinates: { lat: 40.7505, lng: -73.9857 },
          notes: 'Emergency room open 24/7'
        }
      ],
      createdAt: new Date('2025-02-20'),
      updatedAt: new Date('2025-03-15')
    }
  ]);
  
  const [editMode, setEditMode] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SafetyPlan | null>(null);
  const [newStep, setNewStep] = useState('');
  const [newContact, setNewContact] = useState({ name: '', relationship: '', phone: '' });
  const [newLocation, setNewLocation] = useState({ name: '', address: '', notes: '' });

  const handleSelectPlan = (plan: SafetyPlan) => {
    setActivePlan(plan);
    setEditMode(false);
    setEditingPlan(null);
  };

  const handleEditPlan = () => {
    if (activePlan) {
      setEditingPlan({...activePlan});
      setEditMode(true);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingPlan(null);
  };

  const handleSavePlan = () => {
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? {...editingPlan, updatedAt: new Date()} : p));
      setActivePlan({...editingPlan, updatedAt: new Date()});
      setEditMode(false);
      setEditingPlan(null);
    }
  };

  const handleAddStep = () => {
    if (editingPlan && newStep.trim()) {
      const newStepObj: SafetyStep = {
        id: `${editingPlan.id}-${Date.now()}`,
        order: editingPlan.steps.length + 1,
        description: newStep,
        completed: false
      };
      
      setEditingPlan({
        ...editingPlan,
        steps: [...editingPlan.steps, newStepObj]
      });
      
      setNewStep('');
    }
  };

  const handleRemoveStep = (stepId: string) => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        steps: editingPlan.steps.filter(step => step.id !== stepId)
      });
    }
  };

  const handleAddContact = () => {
    if (editingPlan && newContact.name && newContact.phone) {
      const newContactObj: EmergencyContact = {
        id: `${editingPlan.id}-c${Date.now()}`,
        name: newContact.name,
        relationship: newContact.relationship,
        phone: newContact.phone,
        priority: editingPlan.contacts.length + 1
      };
      
      setEditingPlan({
        ...editingPlan,
        contacts: [...editingPlan.contacts, newContactObj]
      });
      
      setNewContact({ name: '', relationship: '', phone: '' });
    }
  };

  const handleRemoveContact = (contactId: string) => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        contacts: editingPlan.contacts.filter(contact => contact.id !== contactId)
      });
    }
  };

  const handleAddLocation = () => {
    if (editingPlan && newLocation.name && newLocation.address) {
      const newLocationObj: SafeLocation = {
        id: `${editingPlan.id}-l${Date.now()}`,
        name: newLocation.name,
        address: newLocation.address,
        coordinates: { lat: 40.7128, lng: -74.0060 }, // Default coordinates
        notes: newLocation.notes
      };
      
      setEditingPlan({
        ...editingPlan,
        safeLocations: [...editingPlan.safeLocations, newLocationObj]
      });
      
      setNewLocation({ name: '', address: '', notes: '' });
    }
  };

  const handleRemoveLocation = (locationId: string) => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        safeLocations: editingPlan.safeLocations.filter(location => location.id !== locationId)
      });
    }
  };

  const handleToggleStep = (stepId: string) => {
    if (activePlan && !editMode) {
      const updatedPlan = {
        ...activePlan,
        steps: activePlan.steps.map(step => 
          step.id === stepId ? {...step, completed: !step.completed} : step
        ),
        updatedAt: new Date()
      };
      
      setActivePlan(updatedPlan);
      setPlans(plans.map(p => p.id === updatedPlan.id ? updatedPlan : p));
    }
  };

  const createNewPlan = () => {
    const newPlan: SafetyPlan = {
      id: Date.now().toString(),
      name: 'New Safety Plan',
      description: 'Description of your safety plan',
      steps: [],
      contacts: [],
      safeLocations: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setPlans([...plans, newPlan]);
    setActivePlan(newPlan);
    setEditingPlan(newPlan);
    setEditMode(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ClipboardList className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Safety Planning</h2>
          </div>
          
          <button
            onClick={createNewPlan}
            className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Plan</span>
          </button>
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* Plans List */}
        <div className="w-64 border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Your Safety Plans</h3>
            <div className="space-y-2">
              {plans.map(plan => (
                <button
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activePlan?.id === plan.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{plan.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Updated {new Date(plan.updatedAt).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Plan Details */}
        <div className="flex-1 overflow-y-auto">
          {activePlan ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {editMode ? (
                      <input
                        type="text"
                        value={editingPlan?.name}
                        onChange={(e) => setEditingPlan(prev => prev ? {...prev, name: e.target.value} : null)}
                        className="border-b border-gray-300 focus:border-blue-500 focus:outline-none text-xl font-bold"
                      />
                    ) : (
                      activePlan.name
                    )}
                  </h3>
                  <p className="text-gray-500 mt-1">
                    {editMode ? (
                      <input
                        type="text"
                        value={editingPlan?.description}
                        onChange={(e) => setEditingPlan(prev => prev ? {...prev, description: e.target.value} : null)}
                        className="border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full text-sm"
                      />
                    ) : (
                      activePlan.description
                    )}
                  </p>
                </div>
                
                <div>
                  {editMode ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSavePlan}
                        className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center space-x-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleEditPlan}
                      className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Plan</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Safety Steps */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <ClipboardList className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Safety Steps</h4>
                  </div>
                  
                  <div className="space-y-3">
                    {(editMode ? editingPlan?.steps : activePlan.steps).map((step) => (
                      <div key={step.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        {editMode ? (
                          <button
                            onClick={() => handleRemoveStep(step.id)}
                            className="flex-shrink-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleStep(step.id)}
                            className={`flex-shrink-0 w-5 h-5 rounded-full border ${
                              step.completed
                                ? 'bg-green-500 border-green-500 flex items-center justify-center'
                                : 'border-gray-300'
                            }`}
                          >
                            {step.completed && <Check className="w-3 h-3 text-white" />}
                          </button>
                        )}
                        
                        <div className="flex-1">
                          {editMode ? (
                            <input
                              type="text"
                              value={step.description}
                              onChange={(e) => {
                                if (editingPlan) {
                                  setEditingPlan({
                                    ...editingPlan,
                                    steps: editingPlan.steps.map(s => 
                                      s.id === step.id ? {...s, description: e.target.value} : s
                                    )
                                  });
                                }
                              }}
                              className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                            />
                          ) : (
                            <p className={`text-sm ${step.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                              {step.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {editMode && (
                      <div className="flex items-center space-x-2 mt-4">
                        <input
                          type="text"
                          placeholder="Add new safety step..."
                          value={newStep}
                          onChange={(e) => setNewStep(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyDown={(e) => e.key === 'Enter' && handleAddStep()}
                        />
                        <button
                          onClick={handleAddStep}
                          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Emergency Contacts */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Phone className="w-5 h-5 text-red-600" />
                    <h4 className="font-medium text-gray-900">Emergency Contacts</h4>
                  </div>
                  
                  <div className="space-y-3">
                    {(editMode ? editingPlan?.contacts : activePlan.contacts).map((contact) => (
                      <div key={contact.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        {editMode && (
                          <button
                            onClick={() => handleRemoveContact(contact.id)}
                            className="flex-shrink-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        
                        <div className="flex-1">
                          {editMode ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={contact.name}
                                onChange={(e) => {
                                  if (editingPlan) {
                                    setEditingPlan({
                                      ...editingPlan,
                                      contacts: editingPlan.contacts.map(c => 
                                        c.id === contact.id ? {...c, name: e.target.value} : c
                                      )
                                    });
                                  }
                                }}
                                className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                                placeholder="Name"
                              />
                              <input
                                type="text"
                                value={contact.relationship}
                                onChange={(e) => {
                                  if (editingPlan) {
                                    setEditingPlan({
                                      ...editingPlan,
                                      contacts: editingPlan.contacts.map(c => 
                                        c.id === contact.id ? {...c, relationship: e.target.value} : c
                                      )
                                    });
                                  }
                                }}
                                className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                                placeholder="Relationship"
                              />
                              <input
                                type="text"
                                value={contact.phone}
                                onChange={(e) => {
                                  if (editingPlan) {
                                    setEditingPlan({
                                      ...editingPlan,
                                      contacts: editingPlan.contacts.map(c => 
                                        c.id === contact.id ? {...c, phone: e.target.value} : c
                                      )
                                    });
                                  }
                                }}
                                className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                                placeholder="Phone"
                              />
                            </div>
                          ) : (
                            <>
                              <p className="text-sm font-medium text-gray-700">{contact.name}</p>
                              <p className="text-xs text-gray-500">{contact.relationship}</p>
                              <p className="text-xs text-blue-600 mt-1">{contact.phone}</p>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {editMode && (
                      <div className="space-y-2 mt-4">
                        <input
                          type="text"
                          placeholder="Contact name"
                          value={newContact.name}
                          onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Relationship"
                          value={newContact.relationship}
                          onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Phone number"
                          value={newContact.phone}
                          onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={handleAddContact}
                          className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          <Plus className="w-4 h-4 inline mr-2" />
                          Add Contact
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Safe Locations */}
              <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Map className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-gray-900">Safe Locations</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(editMode ? editingPlan?.safeLocations : activePlan.safeLocations).map((location) => (
                    <div key={location.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      {editMode && (
                        <button
                          onClick={() => handleRemoveLocation(location.id)}
                          className="flex-shrink-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      
                      <div className="flex-1">
                        {editMode ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={location.name}
                              onChange={(e) => {
                                if (editingPlan) {
                                  setEditingPlan({
                                    ...editingPlan,
                                    safeLocations: editingPlan.safeLocations.map(l => 
                                      l.id === location.id ? {...l, name: e.target.value} : l
                                    )
                                  });
                                }
                              }}
                              className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                              placeholder="Location name"
                            />
                            <input
                              type="text"
                              value={location.address}
                              onChange={(e) => {
                                if (editingPlan) {
                                  setEditingPlan({
                                    ...editingPlan,
                                    safeLocations: editingPlan.safeLocations.map(l => 
                                      l.id === location.id ? {...l, address: e.target.value} : l
                                    )
                                  });
                                }
                              }}
                              className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                              placeholder="Address"
                            />
                            <textarea
                              value={location.notes}
                              onChange={(e) => {
                                if (editingPlan) {
                                  setEditingPlan({
                                    ...editingPlan,
                                    safeLocations: editingPlan.safeLocations.map(l => 
                                      l.id === location.id ? {...l, notes: e.target.value} : l
                                    )
                                  });
                                }
                              }}
                              className="w-full border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none p-2"
                              placeholder="Notes"
                              rows={2}
                            />
                          </div>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-700">{location.name}</p>
                            <p className="text-xs text-gray-500">{location.address}</p>
                            {location.notes && (
                              <p className="text-xs text-gray-600 mt-1">{location.notes}</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {editMode && (
                  <div className="space-y-2 mt-4">
                    <input
                      type="text"
                      placeholder="Location name"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={newLocation.address}
                      onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Notes (optional)"
                      value={newLocation.notes}
                      onChange={(e) => setNewLocation({...newLocation, notes: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                    <button
                      onClick={handleAddLocation}
                      className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 inline mr-2" />
                      Add Safe Location
                    </button>
                  </div>
                )}
              </div>

              {/* Plan Metadata */}
              <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                <div>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Created: {new Date(activePlan.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Last updated: {new Date(activePlan.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <ClipboardList className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500">Select a safety plan or create a new one</p>
              <button
                onClick={createNewPlan}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Create New Plan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Phone icon component
const Phone = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export default SafetyPlanningModule;