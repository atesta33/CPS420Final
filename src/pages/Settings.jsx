import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext.jsx';
import { deleteUser, updateUser } from '../api/users.js';
import { Header } from '../components/Header.jsx';
import styles from './Settings.module.css';

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
    <div className={styles.settingsPage}>
      <Header />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Account Settings</h1>
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Update Credentials</h2>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="current-password">
              Current Password
            </label>
            <input
              id="current-password"
              type="password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={styles.input}
            />
            <p className={styles.helpText}>Required to make changes</p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="new-username">
              New Username (optional)
            </label>
            <input
              id="new-username"
              type="text"
              placeholder="Enter a new username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="new-password">
              New Password (optional)
            </label>
            <input
              id="new-password"
              type="password"
              placeholder="Enter a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
            />
          </div>

          <button
            onClick={() => updateMutation.mutate()}
            disabled={!currentPassword || updateMutation.isPending}
            className={styles.saveButton}
          >
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div className={styles.dangerZone}>
          <h3 className={styles.dangerTitle}>
            ⚠️ Danger Zone
          </h3>
          <p className={styles.dangerText}>
            Once you delete your account, there is no going back. This will permanently delete your account and all your posts.
          </p>
          <button
            onClick={() => {
              if (confirm('Delete your account and all your posts? This cannot be undone.')) {
                deleteMutation.mutate();
              }
            }}
            disabled={deleteMutation.isPending}
            className={styles.deleteButton}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete My Account'}
          </button>
        </div>
      </div>
    </div>
  );
}