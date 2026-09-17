import React, { useState, useEffect } from 'react';

function StudentForm({ onSubmit, editingStudent, onCancelEdit, isSubmitting }) {
  // Local state for the 4 student fields
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    course: '',
    age: '',
  });

  // When editingStudent prop changes, update form fields or reset
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || '',
        rollNo: editingStudent.rollNo || '',
        course: editingStudent.course || '',
        age: editingStudent.age || '',
      });
    } else {
      setFormData({
        name: '',
        rollNo: '',
        course: '',
        age: '',
      });
    }
  }, [editingStudent]);

  // Handle generic input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isEditing = Boolean(editingStudent);

  return (
    <div className="card form-card">
      <div className="card-header">
        <h2>{isEditing ? '✏️ Edit Student' : '➕ Add New Student'}</h2>
        <p className="card-subtitle">
          {isEditing
            ? `Updating details for ${editingStudent.name} (${editingStudent.rollNo})`
            : 'Fill in the details below to register a new student.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-grid">
          {/* Student Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Aarav Sharma"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Roll Number */}
          <div className="form-group">
            <label htmlFor="rollNo">Roll Number *</label>
            <input
              id="rollNo"
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="e.g. CS2026-001"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Course */}
          <div className="form-group">
            <label htmlFor="course">Course / Department *</label>
            <input
              id="course"
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. B.Tech Computer Science"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Age */}
          <div className="form-group">
            <label htmlFor="age">Age *</label>
            <input
              id="age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 20"
              min="1"
              max="120"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button
            type="submit"
            className={`btn ${isEditing ? 'btn-primary' : 'btn-success'}`}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Saving...'
              : isEditing
              ? 'Update Student'
              : 'Add Student'}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
              disabled={isSubmitting}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
