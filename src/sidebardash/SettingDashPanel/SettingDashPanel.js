import React, { useState } from "react";
import "./SettingDashPanel.css";

const SettingsDashboard = () => {
  const [notifications, setNotifications] = useState({
    "Turn on the notification sound": true,
    "Show desktop notifications": false,
    "Emails about suspicious sign-in attempts": true,
    "When someone comments": true,
    "Discount & New subscription plan": false,
    "Product Updates": true,
    "Onboarding materials": true,
  });

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleDelete = () => {
    // Simulate account deletion
    setAccountDeleted(true);
    setPopupVisible(false);

    // Optional: Redirect after a delay
    setTimeout(() => {
      window.location.href = "/account-deleted";
    }, 2000); // Redirects after 2 seconds
  };

  const handlePopupClose = () => {
    setPopupVisible(false); // Close the confirmation popup
  };

  return (
    <div className="settingsContainer">
      <h2 className="settingsTitle">Settings</h2>

      <div className="notificationsPanel">
        <h3 className="panelHeader">Notifications</h3>
        <div className="notificationOptions">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="optionRow">
              <span>{key.replace(/([A-Z])/g, " $1").trim()}</span>
              <input
                id={`checkbox-${key}`}
                type="checkbox"
                checked={value}
                onChange={() => toggleNotification(key)}
              />
              <label htmlFor={`checkbox-${key}`}></label>
            </div>
          ))}
        </div>
      </div>

      <div className="buttonsRow">
        <button className="saveBtn">Save & Update</button>
        <button className="cancelBtn">Cancel</button>
      </div>

      <div className="accountDeletePanel">
        <h3 className="panelHeader">Account Delete</h3>
        <p className="deleteWarning">
          Your personal information will be erased in 30 days. You can reverse this decision within that period by clicking "Cancel Account Deletion" at the bottom of the page.
        </p>
        <p className="deleteDetails">
          After 30 days, all of your personal data will be permanently deleted, and your public profile will be anonymized. Your username and avatar will be replaced with default options, making you unidentifiable. Your phone number will also be removed, but for security reasons, you may not be able to use it for a new account.
        </p>
        <p className="deleteDetails">
          Please be aware that deleting your account will log you out from all devices, and you will lose any unsaved data on your charts.
        </p>
        <div className="buttonsbtnRow">
          <button className="suspendBtn" onClick={() => setPopupVisible(true)}>
            Yes, Suspend
          </button>
          <button className="noBtn" onClick={handlePopupClose}>
            No
          </button>
        </div>
      </div>

      {/* Confirmation Popup */}
      {isPopupVisible && (
        <div className="popupOverlayaccountDeletePanel">
          <div className="popupContentaccountDeletePanel">
            <h3 className="popupContentaccountDeletePanelh3">
              Are you sure you want to delete your account?
            </h3>
            <div className="popupButtonsaccountDeletePanel">
              <button
                className="popupYesBtnaccountDeletePanel"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="popupNoBtnaccountDeletePanel"
                onClick={handlePopupClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Deleted Success Popup */}
      {accountDeleted && (
        <div className="popupOverlayaccountDeleted">
          <div className="popupContentaccountDeleted">
            <h3 className="successMessage">Your account deleted successfully!</h3>
            <button
              className="closePopupButton"
              onClick={() => setAccountDeleted(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDashboard;
