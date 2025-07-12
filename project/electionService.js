import { apiClient } from './api';

export const complaintService = {
  // Get complaints (filtered by user role)
  async getComplaints(filters = {}) {
    try {
      const response = await apiClient.get('/complaints', filters);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch complaints');
    }
  },

  // Get single complaint
  async getComplaint(complaintId) {
    try {
      const response = await apiClient.get(`/complaints/${complaintId}`);
      return response.complaint;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch complaint details');
    }
  },

  // Submit new complaint
  async submitComplaint(complaintData) {
    try {
      const response = await apiClient.post('/complaints', complaintData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to submit complaint');
    }
  },

  // Add response to complaint (Admin only)
  async addResponse(complaintId, responseData) {
    try {
      const response = await apiClient.post(`/complaints/${complaintId}/respond`, responseData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to add response');
    }
  },

  // Update complaint status (Admin only)
  async updateStatus(complaintId, status) {
    try {
      const response = await apiClient.put(`/complaints/${complaintId}/status`, { status });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update complaint status');
    }
  },

  // Assign complaint (Admin only)
  async assignComplaint(complaintId, assignedTo, assignedBranch) {
    try {
      const response = await apiClient.put(`/complaints/${complaintId}/assign`, {
        assignedTo,
        assignedBranch
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to assign complaint');
    }
  }
};