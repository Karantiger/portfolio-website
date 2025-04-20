"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink, Trophy, Award, Star, Code, Target } from "lucide-react"

export default function CodingProfiles() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Sample data - in a real app, this would come from the respective APIs
  const leetcodeData = {
    username: "yourUsername",
    rank: 12345,
    totalSolved: 387,
    easySolved: 152,
    mediumSolved: 187,
    hardSolved: 48,
    totalEasy: 652,
    totalMedium: 1341,
    totalHard: 547,
    contestRating: 1842,
    contestRank: "Knight",
    profileUrl: "https://leetcode.com/username",
  }

  const hackerrankData = {
    username: "yourUsername",
    stars: 5,
    badges: [
      { name: "Problem Solving", level: 6, max: 6 },
      { name: "Java", level: 5, max: 5 },
      { name: "Python", level: 5, max: 5 },
      { name: "JavaScript", level: 4, max: 5 },
      { name: "SQL", level: 3, max: 5 },
      { name: "React", level: 4, max: 5 },
    ],
    certificates: ["Problem Solving (Basic)", "JavaScript (Intermediate)", "React (Basic)"],
    profileUrl: "https://www.hackerrank.com/username",
  }

  return (
    <section id="coding-profiles" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Coding Profiles</h2>
          <div className="mt-2 h-1 w-20 bg-primary rounded-full"></div>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl">
            My achievements and statistics on competitive coding platforms.
          </p>
        </motion.div>

        <Tabs defaultValue="leetcode" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="leetcode">LeetCode</TabsTrigger>
            <TabsTrigger value="hackerrank">HackerRank</TabsTrigger>
          </TabsList>

          <TabsContent value="leetcode" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl">LeetCode Profile</CardTitle>
                      <CardDescription>@{leetcodeData.username}</CardDescription>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={leetcodeData.profileUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                        <p className="text-sm text-muted-foreground">Rank</p>
                        <p className="text-2xl font-bold">{leetcodeData.rank.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <Code className="h-8 w-8 text-primary mb-2" />
                        <p className="text-sm text-muted-foreground">Problems Solved</p>
                        <p className="text-2xl font-bold">{leetcodeData.totalSolved}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <Target className="h-8 w-8 text-blue-500 mb-2" />
                        <p className="text-sm text-muted-foreground">Contest Rating</p>
                        <p className="text-2xl font-bold">{leetcodeData.contestRating}</p>
                        <p className="text-xs text-muted-foreground">{leetcodeData.contestRank}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Problem Solving Progress</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            Easy ({leetcodeData.easySolved}/{leetcodeData.totalEasy})
                          </span>
                          <span className="text-green-500">
                            {Math.round((leetcodeData.easySolved / leetcodeData.totalEasy) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={Math.round((leetcodeData.easySolved / leetcodeData.totalEasy) * 100)}
                          className="h-2 bg-muted"
                          indicatorClassName="bg-green-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            Medium ({leetcodeData.mediumSolved}/{leetcodeData.totalMedium})
                          </span>
                          <span className="text-yellow-500">
                            {Math.round((leetcodeData.mediumSolved / leetcodeData.totalMedium) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={Math.round((leetcodeData.mediumSolved / leetcodeData.totalMedium) * 100)}
                          className="h-2 bg-muted"
                          indicatorClassName="bg-yellow-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            Hard ({leetcodeData.hardSolved}/{leetcodeData.totalHard})
                          </span>
                          <span className="text-red-500">
                            {Math.round((leetcodeData.hardSolved / leetcodeData.totalHard) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={Math.round((leetcodeData.hardSolved / leetcodeData.totalHard) * 100)}
                          className="h-2 bg-muted"
                          indicatorClassName="bg-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="hackerrank" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl">HackerRank Profile</CardTitle>
                      <CardDescription>@{hackerrankData.username}</CardDescription>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={hackerrankData.profileUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex justify-center">
                    <div className="flex items-center">
                      <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                      <span className="text-2xl font-bold ml-2">{hackerrankData.stars} Stars</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Skill Badges</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {hackerrankData.badges.map((badge, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <span>{badge.name}</span>
                              <div className="flex">
                                {Array.from({ length: badge.max }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < badge.level ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Certificates</h3>
                    <div className="flex flex-wrap gap-2">
                      {hackerrankData.certificates.map((certificate, index) => (
                        <div key={index} className="flex items-center bg-muted rounded-full px-3 py-1">
                          <Award className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm">{certificate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

