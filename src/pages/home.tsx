'use client'

import {
  Activity,
  Building2,
  Calendar,
  Clock,
  Mail,
  Settings,
  Shield,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { QuickAction } from '@/components/custom/quick-action'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { auth } from '@/lib/firebase'

export default function Home() {
  const user = auth.currentUser

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Building2 className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sistema de Gestão RHControl
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Gerencie funcionários e recursos de forma eficiente
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Gestão de Funcionários
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Controle completo sobre cadastro e perfis de funcionários
            </p>
          </div>
          <div className="text-center">
            <Settings className="h-12 w-12 mx-auto text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Configurações</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Personalize o sistema de acordo com suas necessidades
            </p>
          </div>
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Segurança Total</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Autenticação robusta e controle de acesso
            </p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link to="/login">
            <Button className="w-full sm:w-auto" size="lg">
              Fazer Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="w-full sm:w-auto" size="lg" variant="outline">
              Criar Conta
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold  mb-4">Ações Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickAction
            available={true}
            description="Visualizar, adicionar e editar funcionários"
            href="/employee/list"
            icon={<Users className="h-5 w-5" />}
            title="Gerenciar Funcionários"
          />
          <QuickAction
            available={true}
            description="Personalizar suas informações e preferências"
            href="/settings/profile"
            icon={<Settings className="h-5 w-5" />}
            title="Configurações do Perfil"
          />
          <QuickAction
            available={false}
            description="Gerenciar eventos e compromissos"
            href="/agenda"
            icon={<Calendar className="h-5 w-5" />}
            title="Agenda"
          />
          <QuickAction
            available={false}
            description="Centro de comunicação interna"
            href="/mensagens"
            icon={<Mail className="h-5 w-5" />}
            title="Mensagens"
          />
          <QuickAction
            available={false}
            description="Configurações de segurança e acesso"
            href="/seguranca"
            icon={<Shield className="h-5 w-5" />}
            title="Segurança"
          />
          <QuickAction
            available={false}
            description="Visualizar métricas e análises"
            href="/relatorios"
            icon={<Activity className="h-5 w-5" />}
            title="Relatórios"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Informações do Usuário</span>
            </CardTitle>
            <CardDescription>Seus dados de perfil no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Nome</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {user.displayName || 'Não informado'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Email Verificado</span>
                </div>
                <Badge variant={user.emailVerified ? 'default' : 'secondary'}>
                  {user.emailVerified ? 'Sim' : 'Não'}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">Membro desde</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/settings/profile">
                <Button className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Editar Perfil
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Próximos Passos</span>
            </CardTitle>
            <CardDescription>
              Sugestões para começar a usar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!user.emailVerified && (
                <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Verificar Email
                      </h4>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                        Verifique seu email para ter acesso completo ao sistema
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!user.displayName && (
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Completar Perfil
                      </h4>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                        Adicione seu nome para personalizar a experiência
                      </p>
                      <Link to="/settings/profile">
                        <Button className="mt-2" size="sm">
                          Completar Agora
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-green-800 dark:text-green-200">
                      Explorar Funcionários
                    </h4>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                      Comece gerenciando a lista de funcionários
                    </p>
                    <Link to="/employee/listar">
                      <Button className="mt-2" size="sm" variant="outline">
                        Ver Funcionários
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
