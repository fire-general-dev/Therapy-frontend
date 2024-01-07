import DashboardIcon from "@/images/icons/dashboard-icon.svg"
import AccountIcon from "@/images/icons/account-icon.svg"
import CalenderIcon from "@/images/icons/calender-icon.svg"
import PatientsIcon from "@/images/icons/patients-icon.svg"
import SettingsIcon from "@/images/icons/settings-icon.svg"
import TherapistsIcon from "@/images/icons/therapists-icon.svg"
import SpecialitiesIcon from "@/images/icons/specialities-icon.svg"
import DocumentsIcon from "@/images/icons/documents-icon.svg"
import HomeIcon from "@/images/icons/home-icon.svg"

const dashboardRoutes = {
  "dashboard/calendar": "/dashboard/calendar",
  "dashboard/patients": "/dashboard/patients",
  "dashboard/doctors/account": "/dashboard/doctors/account",
  "dashboard/doctors/settings": "/dashboard/doctors/settings",
  "dashboard/patients/account": "/dashboard/patients/account",
  "dashboard/patients/reports": "/dashboard/patients/reports",
  "dashboard/patients/documents": "/dashboard/patients/documents",
  dashboard: "/dashboard",
  logout: "/logout",
}

Object.freeze(dashboardRoutes)

const doctorsDashboardRoutes = {
  topSection: [
    {
      route: "/",
      name: "home",
      icon: HomeIcon,
    },
    {
      route: dashboardRoutes.dashboard,
      name: "dashboard",
      icon: DashboardIcon,
    },
    {
      route: dashboardRoutes["dashboard/calendar"],
      name: "calender",
      icon: CalenderIcon,
    },
    {
      route: dashboardRoutes["dashboard/patients"],
      name: "patients",
      icon: PatientsIcon,
    },
  ],
  bottomSection: [
    {
      route: dashboardRoutes["dashboard/doctors/account"],
      name: "account",
      icon: AccountIcon,
    },
    {
      route: dashboardRoutes["dashboard/doctors/settings"],
      name: "settings",
      icon: SettingsIcon,
    },
  ],
}

Object.freeze(doctorsDashboardRoutes)

const patientsDashboardRoutes = {
  homeSection: [
    {
      route: "/",
      name: "home",
      icon: HomeIcon,
    },
    {
      route: "/therapists",
      name: "therapists",
      icon: TherapistsIcon,
    },
    {
      route: "/specialties",
      name: "specialties",
      icon: SpecialitiesIcon,
    },
  ],
  topSection: [
    {
      route: dashboardRoutes.dashboard,
      name: "dashboard",
      icon: DashboardIcon,
    },
    {
      route: dashboardRoutes["dashboard/calendar"],
      name: "calender",
      icon: CalenderIcon,
    },
    // {
    //   route: dashboardRoutes["dashboard/patients/reports"],
    //   name: "reports",
    //   icon: PatientsIcon,
    // },
  ],
  bottomSection: [
    {
      route: dashboardRoutes["dashboard/patients/account"],
      name: "account",
      icon: AccountIcon,
    },
    // {
    //   route: dashboardRoutes["dashboard/patients/documents"],
    //   name: "documents",
    //   icon: DocumentsIcon,
    // },
  ],
}

Object.freeze(patientsDashboardRoutes)

const weekDaysNames = {
  Sunday: "Sundays",
  Monday: "Mondays",
  Tuesday: "Tuesdays",
  Wednesday: "Wednesdays",
  Thursday: "Thursdays",
  Friday: "Fridays",
  Saturday: "Saturdays",
}

Object.freeze(dashboardRoutes)

const appointmentStatus = {
  PENDING_PAYMENT: "pending_payment",
  ACTIVE: "active",
  CANCELED: "canceled",
  RESCHEDULE: "reschedule",
  HOLD: "hold",
  REJECTED_AGENT: "rejected_agent",
  CANCELED_PATIENT: "canceled_patient",
  CANCELED_DOCTOR: "canceled_doctor",
  PENDING_RESCHEDULE_AGENT: "pending_reschedule_agent",
  PENDING_RESCHEDULE_PATIENT: "pending_reschedule_patient",
  PENDING_CANCELE_AGENT: "pending_cancel_agent",
  REJECT_CANCELE_REQUEST: "resject_cancel_request",
  REJECT_RESCHEDULE_REQUEST: "resject_reschedule_request",
  PATIENT_ACTION_REQUIRED: "action_required",
  PENDING_REQUEST: "pending_request",
}

Object.freeze(appointmentStatus)

const requestType = {
  CANCEL: "cancel",
  CANCELED: "canceled",
  RESCHEDULE: "reschedule",
}

Object.freeze(requestType)

const requestStusts = {
  ON_HOLD: "on_hold",
  CANCELED: "canceled",
  RESOLVED: "resolved",
  REJECT: "reject",
  PATIENT_ACTION_REQUIRED: "patient_action_required",
}

Object.freeze(requestStusts)

export {
  dashboardRoutes,
  doctorsDashboardRoutes,
  weekDaysNames,
  patientsDashboardRoutes,
  appointmentStatus,
  requestType,
  requestStusts,
}
