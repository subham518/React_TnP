import React, { useState } from 'react';

function StudentList({
  students,
  loading,
  onEdit,
  onDelete,
  editingStudentId,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter students based on search term (name, rollNo, or course)
  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(term) ||
      student.rollNo.toLowerCase().includes(term) ||
      student.course.toLowerCase().includes(term)
    );
  });

  return (
    <div className="card list-card">
      <div className="card-header list-header">
        <div>
          <h2>📋 Student Directory</h2>
          <p className="card-subtitle">
            {students.length} {students.length === 1 ? 'student' : 'students'} registered
          </p>
        </div>

        {/* Quick Search */}
        {students.length > 0 && (
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, roll no, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="btn-clear-search"
                onClick={() => setSearchTerm('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className="state-container">
          <div className="spinner"></div>
          <p>Loading students...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="state-container empty-state">
          <span className="empty-icon">🎓</span>
          <h3>No Students Found</h3>
          <p>Use the form above to add your first student record.</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="state-container empty-state">
          <span className="empty-icon">🔍</span>
          <h3>No Matching Students</h3>
          <p>No students match "{searchTerm}". Try clearing your search filter.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="student-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Roll No</th>
                <th>Full Name</th>
                <th>Course</th>
                <th>Age</th>
                <th>Registered</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => {
                const isCurrentEditing = editingStudentId === student._id;
                const formattedDate = student.createdAt
                  ? new Date(student.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'N/A';

                return (
                  <tr
                    key={student._id}
                    className={isCurrentEditing ? 'row-editing' : ''}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <span className="badge badge-roll">{student.rollNo}</span>
                    </td>
                    <td className="student-name">
                      <strong>{student.name}</strong>
                    </td>
                    <td>{student.course}</td>
                    <td>{student.age} yrs</td>
                    <td className="text-muted">{formattedDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="btn btn-sm btn-edit"
                          onClick={() => onEdit(student)}
                          title="Edit Student"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-delete"
                          onClick={() => onDelete(student._id, student.name)}
                          title="Delete Student"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;
