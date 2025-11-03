import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext.jsx';
import { deleteUser, updateUser } from '../api/users.js';

export function Settings() {
  const [token, setToken] = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (typeof token !== 'string' || token.split('.').length !== 3) {
        throw new Error('Not logged in or malformed token');
      }
      return updateUser({ token, currentPassword, newUsername, newPassword });
    },
    onSuccess: (data) => {
      if (data?.username) {
        alert(`Credentials updated. New username: ${data.username}`);
      } else {
        alert('Credentials updated');
      }
      setCurrentPassword('');
      setNewUsername('');
      setNewPassword('');
    },
    onError: (e) => alert(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (typeof token !== 'string' || token.split('.').length !== 3) {
        throw new Error('Not logged in or malformed token');
      }
      return deleteUser(token);
    },
    onSuccess: () => {
      alert('Account deleted');
      setToken(null);
    },
    onError: (e) => alert(e.message),
  });

  return (
    <div style={{ maxWidth: 420, margin: '2rem auto', display: 'grid', gap: '1rem' }}>
      <h2>Account Settings</h2>

      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <label>
          Current password
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </label>
        <label>
          New username (optional)
          <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
        </label>
        <label>
          New password (optional)
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <button
          onClick={() => updateMutation.mutate()}
          disabled={!currentPassword || updateMutation.isPending}
        >
          Save changes
        </button>
      </div>

      <hr />

      <div>
        <button
          style={{ background: 'crimson', color: 'white' }}
          onClick={() => {
            if (confirm('Delete your account and all your posts? This cannot be undone.')) {
              deleteMutation.mutate();
            }
          }}
          disabled={deleteMutation.isPending}
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}