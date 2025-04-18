"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, LogOut, User, Settings } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()

  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-white mr-8">
            DeVote
          </Link>

          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/campaigns" className="text-white hover:text-orange-400 transition-colors">
                Campaigns
              </Link>
              <Link href="/voting" className="text-slate-300 hover:text-orange-400 transition-colors">
                Vote
              </Link>
              <Link href="/results" className="text-slate-300 hover:text-orange-400 transition-colors">
                Results
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-orange-500">UN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">User</p>
                  <p className="text-xs leading-none text-muted-foreground truncate">0x1a2b...3c4d</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5 text-white" />
            </Button>
          )}
        </div>
      </div>

      {isMobile && isMenuOpen && (
        <nav className="bg-slate-800 border-t border-slate-700 py-3 px-4">
          <div className="flex flex-col space-y-3">
            <Link
              href="/campaigns"
              className="text-white hover:text-orange-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Campaigns
            </Link>
            <Link
              href="/voting"
              className="text-slate-300 hover:text-orange-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Vote
            </Link>
            <Link
              href="/results"
              className="text-slate-300 hover:text-orange-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Results
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
