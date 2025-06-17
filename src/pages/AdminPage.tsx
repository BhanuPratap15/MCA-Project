import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Globe, DollarSign, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDomains } from '../context/DomainContext';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const { user } = useAuth();
  const { domains, addDomain, updateDomain, deleteDomain } = useDomains();
  const [activeTab, setActiveTab] = useState('domains');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDomain, setEditingDomain] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'tech',
    price: '',
    description: '',
    featured: false
  });

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Admin access required</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Domains', value: domains.length, icon: <Globe className="h-6 w-6" /> },
    { label: 'Available', value: domains.filter(d => d.available).length, icon: <BarChart3 className="h-6 w-6" /> },
    { label: 'Revenue', value: `$${domains.reduce((sum, d) => sum + (d.available ? 0 : d.price), 0)}`, icon: <DollarSign className="h-6 w-6" /> },
    { label: 'Users', value: '156', icon: <Users className="h-6 w-6" /> }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const domainData = {
      ...formData,
      price: parseFloat(formData.price),
      available: true,
      featured: formData.featured
    };

    if (editingDomain) {
      updateDomain(editingDomain.id, domainData);
      setEditingDomain(null);
    } else {
      addDomain(domainData);
    }

    setFormData({ name: '', category: 'tech', price: '', description: '', featured: false });
    setShowAddModal(false);
  };

  const handleEdit = (domain: any) => {
    setEditingDomain(domain);
    setFormData({
      name: domain.name,
      category: domain.category,
      price: domain.price.toString(),
      description: domain.description,
      featured: domain.featured
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this domain?')) {
      deleteDomain(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage domains, users, and system settings</p>
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
              <button
                onClick={() => setActiveTab('domains')}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'domains'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Globe className="h-5 w-5" />
                <span>Domain Management</span>
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Domains</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Domain</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Domain</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Category</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Price</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Featured</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {domains.map((domain) => (
                    <tr key={domain.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">
                        <div>
                          <div className="font-medium text-gray-900">{domain.name}</div>
                          <div className="text-sm text-gray-600">{domain.description}</div>
                        </div>
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {domain.category}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-medium">${domain.price}</td>
                      <td className="border border-gray-200 px-4 py-3">
                        <span className={`px-2 py-1 text-sm rounded-full ${
                          domain.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {domain.available ? 'Available' : 'Sold'}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        {domain.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(domain)}
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(domain.id)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingDomain ? 'Edit Domain' : 'Add New Domain'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="tech">Tech</option>
                    <option value="business">Business</option>
                    <option value="creative">Creative</option>
                    <option value="startup">Startup</option>
                    <option value="ecommerce">E-commerce</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured domain</span>
                  </label>
                </div>
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  >
                    {editingDomain ? 'Update' : 'Add'} Domain
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingDomain(null);
                      setFormData({ name: '', category: 'tech', price: '', description: '', featured: false });
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;