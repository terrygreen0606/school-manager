/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/MemberPanel/Dashboard.jsx";
// import WithdrawalSetup from "views/Setup/WithdrawalSetup.jsx";
import Profile from "views/MemberPanel/Profile/Profile.jsx";
import Orders from "views/MemberPanel/Orders/Orders.jsx";
import Notifications from "views/MemberPanel/Components/Notifications.jsx";
import Ewallet from "views/MemberPanel/Ewallet/Ewallet";
import Transaction from "views/MemberPanel/Ewallet/Transaction";
import WithdrawalOnWardTransaction from "views/MemberPanel/Ewallet/WithdrawalOnwardTrans";
import FundTransfer from "views/MemberPanel/Ewallet/FundTransfer";
import TransferHistory from "views/MemberPanel/Ewallet/TransferHistory";
import UserEarnings from "views/MemberPanel/Ewallet/UserEarnings";
import WithdrawalStaus from "views/MemberPanel/Ewallet/WithdrawalStatus";

import BusinessSummary from "views/MemberPanel/Business/BusinessSummary";
import BusinessTransactions from "views/MemberPanel/Business/BusinessTransaction";
import Epins from "views/MemberPanel/Epin/Epins";
import ViewEpin from "views/MemberPanel/Epin/ViewEpin";
import EpinTransfer from "views/MemberPanel/Epin/EpinTransfer";

import Genealogy from "views/MemberPanel/Downlines/Genealogy";
import Tabular from "views/MemberPanel/Downlines/Tabular";
import PayoutList from "views/MemberPanel/Payout/Payoutlist";
import TicketList from "views/MemberPanel/SupportSystem/TicketList";
import OpenTickets from "views/MemberPanel/SupportSystem/OpenTickets";
import ClosedTickets from "views/MemberPanel/SupportSystem/ClosedTickets";
import EcommerceStore from "views/MemberPanel/Ecommerce/EcommerceStore";
import LoginPage from "views/MemberPanel/Pages/LoginPage.jsx";
import Messages from "views/MemberPanel/Messages/Messages.jsx";

var routes = [
  {
    path: "/dashboard",
    layout: "/member",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  
 /*   {
    path: "/withdrawal-settings",
    layout: "/member",
    name: "Withdrawal Setup",
    icon: "pe-7s-wallet",
    component: WithdrawalSetup
    
  }, */
  
  {
    collapse: true,
    path:"/downlines",
    name: "Downlines",
    state: "opendownlines",
    icon: "pe-7s-network",
    views: [
      {
        path: "/genealogy",
        name: "Genealogy",
        mini: "GE",
        layout: "/member",
        component: Genealogy

      },
      {
        path: "/tabular",
        name: "Tabular List",
        mini: "TL",
        layout: "/member",
        component: Tabular

      }
    ]
  },
  {
    path: "/ecommerce-store",
    layout: "/member",
    name: "eCommerce Store",
    icon: "pe-7s-cart",
    component: EcommerceStore
  },
  {
    path: "/orders",
    layout: "/member",
    name: "All Orders",
    icon: "pe-7s-albums",
    component: Orders
  },
  {
    collapse: true,
    path: "/ewallet",
    name: "eWallet",
    state: "openwallet",
    icon: "pe-7s-wallet",
    views: [
      {
        path: "/ewallet-summery",
        layout: "/member",
        name: "eWallet Summery",
        mini: "WS",
        component: Ewallet
      },
      {
        path: "/transactions",
        layout: "/member",
        name: "Transactions",
        mini: "TR",
        component: Transaction
      },
      {
        path: "/withdrawal-and-onwards-funds",
        layout: "/member",
        name: "Withdrawal & Onward Transactions",
        mini: "WOT",
        component: WithdrawalOnWardTransaction
      },
      {
        path: "/withdrawal-status",
        layout: "/member",
        name: "Withdrawal Status",
        mini: "WS",
        component: WithdrawalStaus
      },
      {
        path: "/fund-transfer",
        layout: "/member",
        name: "Fund Transfer",
        mini: "FT",
        component: FundTransfer
      },
      {
        path: "/transfer-history",
        layout: "/member",
        name: "Transfer History",
        mini: "TH",
        component: TransferHistory
      },
      // {
      //   path: "/user-earnings",
      //   layout: "/member",
      //   name: "User Earnings",
      //   mini: "UE",
      //   component: UserEarnings
      // }
    ]
  },
  {
    collapse: true,
    path: "/business",
    name: "Business",
    state: "openbusiness",
    icon: "pe-7s-diamond",
    views: [
      {
        path: "/business-summery",
        layout: "/member",
        name: "Business Summary",
        mini: "BS",
        component: BusinessSummary
      },
      {
        path: "/business-transactions",
        layout: "/member",
        name: "Business Transactions",
        mini: "BT",
        component: BusinessTransactions
      }
    ]
  },
  {
    collapse: true,
    path: "/epin",
    name: "ePIN",
    state: "openepin",
    icon: "pe-7s-pin",
    views: [
      {
        path: "/generate-epin",
        layout: "/member",
        name: "Epins",
        mini: "GE",
        component: Epins
      },
     /* {
        path: "/epin-requests",
        layout: "/member",
        name: "Epin Requests",
        mini: "ER",
        component: EpinRequests
      }, 
      {
        path: "/epin-allocation",
        layout: "/member",
        name: "PIN Allocation",
        mini: "PA",
        component: EpinAllocation
      }, 
      {
        path: "/view-epin",
        layout: "/member",
        name: "View Epin",
        mini: "VE",
        component: ViewEpin
      }, */
      {
        path: "/epin-transfer",
        layout: "/member",
        name: "E-PIN Transfer",
        mini: "ET",
        component: EpinTransfer
      }
    ]
  },
  

 {
  path: "/payout",
  name: "Payout List",
  icon: "pe-7s-anchor",
  layout: "/member",
  component: PayoutList
},
  {
    path: "/messages",
    name: "Messages",
    icon: "pe-7s-mail",
    layout: "/member",
    component: Messages
  },
  /* {
    path: "/bulk-sms",
    name: "Bulk SMS",
    icon: "pe-7s-mail-open",
    layout: "/member",
    component: Bulksms
  },
  {
    path: "/bulk-email",
    name: "Bulk Email",
    icon: "pe-7s-mail-open-file",
    layout: "/member",
    component: Bulkemail
  }, */
  {
    collapse: true,
    path: "/support-system",
    name: "Support System",
    state: "opensupportsystem",
    icon: "pe-7s-headphones",
    views: [
      {
        path: "/support-tickets",
        layout: "/member",
        name: "All Tickets",
        mini: "ST",
        component: TicketList
      },
      {
        path: "/open-tickets",
        layout: "/member",
        name: "Open Tickets",
        mini: "OT",
        component: OpenTickets
      },
      {
        path: "/closed-tickets",
        layout: "/member",
        name: "Closed/Resolved Tickets",
        mini: "CT",
        component: ClosedTickets
      }
    ]
  },
  {
    collapse: true,
    path: "/report",
    name: "Report",
    state: "openreport",
    icon: "pe-7s-copy-file",
    views: [
      {
        path: "/joinings-report",
        layout: "/member",
        name: "Joinings",
        mini: "J",
        component: ClosedTickets
      },
      {
        path: "/active-deactive-users-report",
        layout: "/member",
        name: "Active/Deactive Users",
        mini: "GS",
        component: ClosedTickets
      },
      {
        path: "/free-paid-users-report",
        layout: "/member",
        name: "Free/Paid Users Report",
        mini: "P",
        component: ClosedTickets
      },
      {
        path: "/monthwise-revanue",
        layout: "/member",
        name: "Monthwise revanue",
        mini: "MR",
        component: ClosedTickets
      },
      {
        path: "/transactions",
        layout: "/member",
        name: "transactions",
        mini: "TR",
        component: Notifications
      },
      {
        path: "/failed-transactions",
        layout: "/member",
        name: "Failed Transactions",
        mini: "FT",
        component: ClosedTickets
      },
      {
        path: "/pin-history-report",
        layout: "/member",
        name: "PIN History",
        mini: "PH",
        component: ClosedTickets
      },
      {
        path: "/user-activity-report",
        layout: "/member",
        name: "User Activity Report",
        mini: "UA",
        component: ClosedTickets
      },
      {
        path: "/user-earning-report",
        layout: "/member",
        name: "User Earning Report",
        mini: "UE",
        component: ClosedTickets
      },
      {
        path: "/top-earner-report",
        layout: "/member",
        name: "Top Earner Report",
        mini: "TE",
        component: ClosedTickets
      },
      {
        path: "/payout-released-report",
        layout: "/member",
        name: "Payout Released Report",
        mini: "PR",
        component: ClosedTickets
      },
      {
        path: "/user-wise-sms-log-report",
        layout: "/member",
        name: "Userwise SMS Log Report",
        mini: "TE",
        component: ClosedTickets
      }
    ]
  },
  {
    path: "/login",
    layout: "/auth",
    component: LoginPage
  },
  {
    path: "/profile",
    layout: "/member",
    name: "Profile",
    component: Profile,
    invisible: true
  }
  
];
export default routes;
