import React, { useState } from 'react';
import { Globe, Calendar, Settings, Plus, ExternalLink, BarChart3, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDomains } from '../context/DomainContext';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const { userDomains } = useDomains();
  const [activeTab, setActiveTab] = useState('domains');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to access your dashboard</p>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Active Domains', value: userDomains.length, icon: <Globe className="h-6 w-6" /> },
    { label: 'Total Spent', value: `$${userDomains.reduce((sum, domain) => sum + domain.price, 0)}`, icon: <CreditCard className="h-6 w-6" /> },
    { label: 'Days Active', value: '42', icon: <Calendar className="h-6 w-6" /> },
    { label: 'Performance', value: '99.9%', icon: <BarChart3 className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Manage your domains and monitor their performance
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'domains', label: 'My Domains', icon: <Globe className="h-5 w-5" /> },
                { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'domains' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Your Domains</h2>
                  <Link
                    to="/marketplace"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Buy Domain</span>
                  </Link>
                </div>

                {userDomains.length > 0 ? (
                  <div className="space-y-4">
                    {userDomains.map((domain) => (
                      <div key={domain.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{domain.name}</h3>
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                Active
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3">{domain.description}</p>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Expires: Dec 2024</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <BarChart3 className="h-4 w-4" />
                                <span>99.9% uptime</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Annual Cost</p>
                              <p className="text-lg font-semibold text-gray-900">${domain.price}</p>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                              <ExternalLink className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No domains yet</h3>
                    <p className="text-gray-600 mb-6">
                      Start building your online presence by purchasing your first domain
                    </p>
                    <Link
                      to="/marketplace"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Browse Domains
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={user.name}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="text-blue-600 focus:ring-blue-500 rounded" defaultChecked />
                        <span className="ml-2 text-gray-700">Email notifications for domain renewals</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="text-blue-600 focus:ring-blue-500 rounded" defaultChecked />
                        <span className="ml-2 text-gray-700">Security alerts and updates</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="text-blue-600 focus:ring-blue-500 rounded" />
                        <span className="ml-2 text-gray-700">Marketing communications</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;