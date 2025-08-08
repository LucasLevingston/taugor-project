import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'

interface QuickActionProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  available: boolean
}

export const QuickAction = ({
  icon,
  title,
  description,
  href,
  available,
}: QuickActionProps) => (
  <Link className="group" to={href}>
    <Card
      className={`h-full transition-all duration-200 ${
        available
          ? 'hover:shadow-md hover:scale-[1.02] cursor-pointer'
          : 'opacity-50 cursor-not-allowed'
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`p-2 rounded-lg ${
                available
                  ? 'bg-primary/10 text-primary'
                  : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
              }`}
            >
              {icon}
            </div>
            <div className="flex-1">
              <h3
                className={`font-semibold text-sm transition-colors ${
                  available ? 'group-hover:text-primary' : 'text-gray-500'
                }`}
              >
                {title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
              {!available && (
                <Badge className="mt-2 text-xs" variant="outline">
                  Em breve
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {available && (
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
)
