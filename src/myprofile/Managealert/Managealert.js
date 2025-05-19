import React, { useState, useContext, useEffect } from "react";
import "./Managealert.css"; // Add your styles here
import Navbar from "../../Navbar/Navbar";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { API_BASE_URL } from "../../config";
import useSubscriptionStatus from "../../Navbar/Hooks/useSubscriptionStatus";
import AccountBar from "../AccountBar";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'

const Managealert = () => {
  const navigate = useNavigate();
  const { isSubscribed, isLoading } = useSubscriptionStatus(API_BASE_URL);
  const [activeNotification, setActiveNotification] = useState(null);
  const [showLoginPopup, setShowPopupforLogin] = useState(false)
  const [subscribedItems, setSubscribedItems] = useState({});
  const manage = [
    "stop_loss_alert",
    "right_time_buy_sell_signals",
    "Buy_sell_price_triggers",
    "smart_alerts",
    "investment_newsletter",
    "specialoffers",
    "siteinfo"
  ]

  const initialAlertsState = manage.reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, {});

  const [managealerts, setmanagealerts] = useState(initialAlertsState)

  useEffect(() => {
    const token = Cookies.get('jwtToken');

    const fetchData = async () => {
      try {
        const fetchresponse = await fetch(`${API_BASE_URL}/manageAlert`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await fetchresponse.json();
        const fetchedData = data.data;
        console.log("Fetched Data:", fetchedData);

        const formattedData = {
          Buy_sell_price_triggers: Number(fetchedData[0].Buy_sell_price_triggers) !== 0,
          smart_alerts: Number(fetchedData[0].Smart_alerts) !== 0,
          investment_newsletter: Number(fetchedData[0].investmant_newsletter) !== 0, // <-- match exactly!
          right_time_buy_sell_signals: Number(fetchedData[0].right_time_buy_sell_signals) !== 0,
          siteinfo: Number(fetchedData[0].siteinfo_featureUsage) !== 0,
          specialoffers: Number(fetchedData[0].special_offers) !== 0,
          stop_loss_alert: Number(fetchedData[0].stop_loss_alert) !== 0,
        };

        setmanagealerts(formattedData);
        console.log("Formatted Data:", formattedData);
      } catch (e) {
        console.error("Error while fetching data:", e);
      }
    };

    fetchData();
  }, []);



  const subscriptionData = [
    {
      title: "E-mailers/ SMS",
      items: [
        "Site information/ Feature usage",
        "Promotional/ Special offers",
        "Investment Shastra Newsletter",
        "Smart Alerts",
      ],
    },
    {
      title: "E-mailers/ SMS Alerts",
      items: [
        "Buy/Sell Price triggers",
        "Right Timing Buy/Sell signals",
        "Stop Loss alerts",
      ],
    },
  ];

const alertKeyMap = {
      "Stop Loss alerts": "stop_loss_alert",
      "Right Timing Buy/Sell signals": "right_time_buy_sell_signals",
      "Buy/Sell Price triggers": "Buy_sell_price_triggers",
      "Smart Alerts": "smart_alerts",
      "Investment Shastra Newsletter": "investment_newsletter",
      "Promotional/ Special offers": "specialoffers",
      "Site information/ Feature usage": "siteinfo",
    };

  const handleSubscribe = async (item) => {
    

    let setvalue = alertKeyMap[item]

    const Cookie_token = Cookies.get("jwtToken")
    try {
      const forbackend = { ...managealerts, [setvalue]: !managealerts[setvalue] };
      console.log(forbackend)

      setmanagealerts(forbackend)

      const response = await fetch(`${API_BASE_URL}/manageAlert/postmanagealert`, {
        method: "post",
        body: JSON.stringify(forbackend),
        headers: {
          "Authorization": `Bearer ${Cookie_token}`,
          "Content-Type": "application/json"
        }
      })
      console.log(response)

      //posttoManagementAlert(Cookie_token)


    } catch (e) {
      setShowPopupforLogin(true)
    }
    setSubscribedItems((prevState) => {
      const newState = { ...prevState, [item]: !prevState[item] };
      return newState;
    });
  };

  const handleNotificationClose = (item) => {
    setSubscribedItems((prevState) => {
      const newState = { ...prevState };
      delete newState[item]; // Remove the item from the state after the notification
      return newState;
    });
  };

  return (
    <div>
      <div className="managealertalldata">
        <h1 className="profilepage-titleorder">Manage Alert</h1>
        <AccountBar />
        <p className="descriptionnalert">
          You may unsubscribe from any Email/SMS alerts' category by clicking on
          the <br />
          respective links below. If you have any query, feel free to{" "}
          <a href="/contactus" className="contact-link">
            contact us
          </a>
          .
        </p>
        {subscriptionData.map((category, index) => (
          <div key={index} className="subscription-category">
            <h2 className="category-title">{category.title}</h2>
            {category.items.map((item, idx) => (
              <div key={idx} className="subscription-item">
                <div className="subscriptionitemmboth">
                  <span className="item-name">{item}</span>
                  {managealerts[alertKeyMap[item]] !== undefined && (
                    <div className="notification-alert">
                      {managealerts[alertKeyMap[item]] && (
                        <div className="subscribersuccesful">
                          You have successfully subscribed to "{item}"!
                        </div>
                      ) }
                      <span
                        className="close-notification"
                        onClick={() => handleNotificationClose(item)}
                      ></span>
                    </div>
                  )}
                </div>
                <button
                  className={
                    managealerts[alertKeyMap[item]]
                      ? "unsubscribe-button"
                      : "subscribe-buttonmanage"
                  }
                  onClick={() => handleSubscribe(item)}
                >
                  {managealerts[alertKeyMap[item]] ? "Unsubscribe" : "Subscribe"}
                </button>
              </div>
            ))}
          </div>
        ))}
        {
          !isSubscribed && !isLoading &&
          <div className="subscribe-footerrmanagealert">
            <h1 className="headingmanagealert">Subscribe Now!</h1>
            <h2>Choose a plan that aligns with your investment goals!</h2>
            <button className="footer-subscribe-buttonmanage" onClick={() => { navigate('/subscription') }} >Subscribe</button>
          </div>
        }
        {showLoginPopup && (
          <div className="payment-popup">
            <div className="payment-popup-content">
              <h2>You Are not Logged in!</h2>
              <p className="amount-paid">Please Login</p>
              <button type="button" onClick={() => navigate('/login')}
                className="loginbtn billing-detailspages-pay-button">Login</button>
            </div>
          </div>
        )}

        <Navbar />

      </div>
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
  );
};

export default Managealert;
