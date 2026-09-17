import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './services/studentService';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Display feedback message with auto-dismiss after 4 seconds
  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback({ type: '', message: '' });
    }, 4000);
  };

  // Fetch all students from backend
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      showFeedback('error', err.message || 'Failed to load students.');
    } finally {
      setLoading(false);
    }
  };

  // Load students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle Create or Update from StudentForm
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // UPDATE operation
        const updated = await updateStudent(editingStudent._id, formData);
        showFeedback('success', `Student "${updated.name}" updated successfully!`);
        setEditingStudent(null);
      } else {
        // CREATE operation
        const created = await createStudent(formData);
        showFeedback('success', `Student "${created.name}" added successfully!`);
      }
      // Refresh list
      await fetchStudents();
    } catch (err) {
      showFeedback('error', err.message || 'Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle clicking Edit on a student row
  const handleEdit = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel Edit mode
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Handle Delete operation
  const handleDelete = async (id, studentName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete student "${studentName}"?`
    );
    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      showFeedback('success', `Student "${studentName}" was deleted.`);
      if (editingStudent && editingStudent._id === id) {
        setEditingStudent(null);
      }
      await fetchStudents();
    } catch (err) {
      showFeedback('error', err.message || 'Failed to delete student.');
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo-icon">🎓</span>
            <div>
              <h1>Student Management System</h1>
              <p className="subtitle">MERN Stack CRUD Application</p>
            </div>
          </div>
          <div className="header-badge">
            <span className="pulse-dot"></span>
            MongoDB Connected
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Notification / Feedback Banner */}
        {feedback.message && (
          <div className={`alert alert-${feedback.type}`}>
            <span>
              {feedback.type === 'success' ? '✅ ' : '⚠️ '}
              {feedback.message}
            </span>
            <button
              className="alert-close"
              onClick={() => setFeedback({ type: '', message: '' })}
            >
              ✕
            </button>
          </div>
        )}

        {/* Create / Edit Form */}
        <StudentForm
          onSubmit={handleFormSubmit}
          editingStudent={editingStudent}
          onCancelEdit={handleCancelEdit}
          isSubmitting={isSubmitting}
        />

        {/* Students Table / Directory */}
        <StudentList
          students={students}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          editingStudentId={editingStudent ? editingStudent._id : null}
        />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Built with MongoDB • Express.js • React • Node.js</p>
      </footer>
    </div>
  );
}

export default App;
