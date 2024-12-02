'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [users, setUsers] = useState<{ id: number, name: string }[]>([])
  const [selectedUser, setSelectedUser] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api-tasks-wm.vercel.app/users')
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`)
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        console.error(err)
        //@ts-expect-error to not break
        setError(err.message || 'An error occurred while fetching users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    if (selectedUser) {
      console.log(`Logging in as user: ${selectedUser}`)
      localStorage.setItem('selectedUser', JSON.stringify(selectedUser))
      // Aqui você pode manipular o processo de login, como salvar o contexto do usuário ou redirecionar para o dashboard
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Carregando usuarios...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Selecione o usuário</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent>
            <Select onValueChange={setSelectedUser} value={selectedUser}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um usuário" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!selectedUser}>
              Log in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
