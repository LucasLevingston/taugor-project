'use client'

import {
  Activity,
  Axis3D,
  Building,
  Cake,
  Calendar,
  CheckCircle,
  CreditCard,
  DollarSign,
  Fingerprint,
  Hash,
  ImageIcon,
  Layers,
  Lock,
  LogIn,
  Mail,
  MailCheck,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  RouteIcon as Road,
  Scale,
  ShieldCheck,
  Tag,
  Target,
  User,
  Users,
} from 'lucide-react'

export const getIconByFormName = (name: string) => {
  switch (name) {
    case 'id':
      return <Fingerprint className="h-4 w-4" />
    case 'name':
      return <User className="h-4 w-4" />
    case 'email':
      return <Mail className="h-4 w-4" />
    case 'password':
      return <Lock className="h-4 w-4" />
    case 'confirmPassword':
      return <Lock className="h-4 w-4" />
    case 'cpf':
      return <CreditCard className="h-4 w-4" />
    case 'googleAccessToken':
      return <ImageIcon className="h-4 w-4" />
    case 'imageUrl':
      return <ImageIcon className="h-4 w-4" />
    case 'gender':
      return <Users className="h-4 w-4" />
    case 'role':
      return <ShieldCheck className="h-4 w-4" />
    case 'isActive':
      return <CheckCircle className="h-4 w-4" />
    case 'lastLogin':
      return <LogIn className="h-4 w-4" />
    case 'emailVerified':
      return <MailCheck className="h-4 w-4" />
    case 'birthDate':
      return <Cake className="h-4 w-4" />
    case 'phone':
      return <Phone className="h-4 w-4" />
    case 'zipCode':
      return <MapPin className="h-4 w-4" />
    case 'city':
      return <Building className="h-4 w-4" />
    case 'state':
      return <MapPin className="h-4 w-4" />
    case 'street':
      return <Road className="h-4 w-4" />
    case 'number':
      return <Hash className="h-4 w-4" />
    case 'createdAt':
      return <Calendar className="h-4 w-4" />
    case 'updatedAt':
      return <RefreshCw className="h-4 w-4" />
    case 'action':
      return <Activity className="h-4 w-4" />
    case 'objective':
      return <Target className="h-4 w-4" />
    case 'status':
      return <CheckCircle className="h-4 w-4" />
    case 'product':
      return <Package className="h-4 w-4" />
    case 'unity':
      return <Scale className="h-4 w-4" />
    case 'predictedValue':
      return <DollarSign className="h-4 w-4" />
    case 'predictedStartsDate':
      return <Calendar className="h-4 w-4" />
    case 'predictedEndDate':
      return <Calendar className="h-4 w-4" />
    case 'programName':
      return <Tag className="h-4 w-4" />
    case 'programType':
      return <Layers className="h-4 w-4" />
    case 'strategicAxis':
      return <Axis3D className="h-4 w-4" />
    case 'budget':
      return <DollarSign className="h-4 w-4" />
    case 'startDate':
      return <Calendar className="h-4 w-4" />
    case 'endDate':
      return <Calendar className="h-4 w-4" />
    case 'targetAudience':
      return <Users className="h-4 w-4" />
    case 'prefectureName':
      return <Building className="h-4 w-4" />
    default:
      return null
  }
}
