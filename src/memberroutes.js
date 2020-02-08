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
import Dashboard from "views/Dashboard.jsx";
// import WithdrawalSetup from "views/Setup/WithdrawalSetup.jsx";
import Profile from "views/Profile/Profile.jsx";
import Orders from "views/Orders/Orders.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Ewallet from "views/Ewallet/Ewallet";
import Transaction from "views/Ewallet/Transaction";
import WithdrawalOnWardTransaction from "views/Ewallet/WithdrawalOnwardTrans";
import CreditDebit from "views/Ewallet/CreditDebit";
import FundTransfer from "views/Ewallet/FundTransfer";
import TransferHistory from "views/Ewallet/TransferHistory";
import UserEarnings from "views/Ewallet/UserEarnings";
import WithdrawalStaus from "views/Ewallet/WithdrawalStatus";
import GlobalNotices from "views/Notice/GlobalNotices";

import BusinessSummary from "views/Business/BusinessSummary";
import BusinessTransactions from "views/Business/BusinessTransaction";
import Epins from "views/Epin/Epins";
import EpinRequests from "views/Epin/EpinRequests";
import EpinAllocation from "views/Epin/EpinAllocation";
import ViewEpin from "views/Epin/ViewEpin";
import EpinTransfer from "views/Epin/EpinTransfer";

import Genealogy from "views/Downlines/Genealogy";
import Tabular from "views/Downlines/Tabular";
import PayoutList from "views/Payout/Payoutlist";
import TicketList from "views/SupportSystem/TicketList";
import OpenTickets from "views/SupportSystem/OpenTickets";
import ClosedTickets from "views/SupportSystem/ClosedTickets";
import EcommerceStore from "views/Ecommerce/EcommerceStore";
import Bulksms from "views/SMS/Bulksms";
import Bulkemail from "views/Email/Bulkemail";
import LoginPage from "views/Pages/LoginPage.jsx";

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
        path: "/credit-debit",
        layout: "/member",
        name: "Credit/Debit",
        mini: "CD",
        component: CreditDebit
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
      {
        path: "/user-earnings",
        layout: "/member",
        name: "User Earnings",
        mini: "UE",
        component: UserEarnings
      }
    ]
  },
  {
    path: "/g-notices",
    name: "Global Notices",
    icon: "pe-7s-volume",
    layout: "/member",
    component: GlobalNotices
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
      {
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
      },
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
    component: ClosedTickets
  },
  {
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
  },
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
