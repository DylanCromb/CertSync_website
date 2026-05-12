import { Check, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Pricing() {
  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 text-center flex-col">
          <Badge className="px-3 py-1">Plans</Badge>
          <div className="flex gap-3 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tight max-w-2xl text-center font-semibold text-slate-900">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg leading-relaxed tracking-normal text-muted-foreground max-w-2xl text-center">
              Built for individuals, teams, and enterprise operations that need clear visibility over credential records and expiry dates.
            </p>
          </div>
          <div className="grid pt-12 text-left grid-cols-1 lg:grid-cols-4 w-full gap-6">
            {/* Individual Plan */}
            <Card className="w-full rounded-xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>
                  <span className="flex flex-row gap-4 items-center font-medium">
                    Individual
                  </span>
                </CardTitle>
                <CardDescription>
                  For contractors and workers managing personal credentials.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-7 justify-start">
                  <p className="flex flex-row items-end gap-2 text-xl">
                    <span className="text-4xl font-semibold text-slate-900">$8</span>
                    <span className="text-sm text-muted-foreground pb-1">
                      / month
                    </span>
                  </p>
                  <div className="flex flex-col gap-4 justify-start">
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Unlimited credentials</p>
                        <p className="text-muted-foreground text-sm">
                          Store licences, permits and certificates
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Expiry tracking</p>
                        <p className="text-muted-foreground text-sm">
                          Reminders before key records expire
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Controlled access</p>
                        <p className="text-muted-foreground text-sm">
                          Share credential evidence where authorised
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2 border-slate-300 hover:border-slate-400" asChild>
                    <a href="/contact.html">Get Started <MoveRight className="w-4 h-4" /></a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Starter Plan */}
            <Card className="w-full rounded-xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>
                  <span className="flex flex-row gap-4 items-center font-medium">
                    Starter
                  </span>
                </CardTitle>
                <CardDescription>
                  For small businesses with a growing frontline team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-7 justify-start">
                  <p className="flex flex-row items-end gap-2 text-xl">
                    <span className="text-4xl font-semibold text-slate-900">$99</span>
                    <span className="text-sm text-muted-foreground pb-1">
                      / month
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">Up to 25 employees</p>
                  <div className="flex flex-col gap-4 justify-start">
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Team management</p>
                        <p className="text-muted-foreground text-sm">
                          Manage worker and contractor records
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Compliance reporting</p>
                        <p className="text-muted-foreground text-sm">
                          Export record summaries for reviews
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Email support</p>
                        <p className="text-muted-foreground text-sm">
                          Priority email assistance
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2 border-slate-300 hover:border-slate-400" asChild>
                    <a href="/contact.html">Get Started <MoveRight className="w-4 h-4" /></a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Basic Plan - Highlighted */}
            <Card className="w-full rounded-xl border-2 border-primary/60 shadow-lg relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-indigo-500" />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>
                    <span className="flex flex-row gap-4 items-center font-semibold">
                      Basic
                    </span>
                  </CardTitle>
                  <Badge>Recommended</Badge>
                </div>
                <CardDescription>
                  For teams that need stronger reporting and oversight.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-7 justify-start">
                  <p className="flex flex-row items-end gap-2 text-xl">
                    <span className="text-4xl font-semibold text-slate-900">$199</span>
                    <span className="text-sm text-muted-foreground pb-1">
                      / month
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">Up to 75 employees</p>
                  <div className="flex flex-col gap-4 justify-start">
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Everything in Starter</p>
                        <p className="text-muted-foreground text-sm">
                          Plus stronger reporting workflows
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Advanced reporting</p>
                        <p className="text-muted-foreground text-sm">
                          More ways to review stored records
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Priority support</p>
                        <p className="text-muted-foreground text-sm">
                          Email and phone support
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="gap-2" asChild>
                    <a href="/contact.html">Get Started <MoveRight className="w-4 h-4" /></a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise/Custom Plan */}
            <Card className="w-full rounded-xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>
                  <span className="flex flex-row gap-4 items-center font-medium">
                    Enterprise
                  </span>
                </CardTitle>
                <CardDescription>
                  For multi-site or complex compliance environments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-7 justify-start">
                  <p className="flex flex-row items-end gap-2 text-xl">
                    <span className="text-4xl font-semibold text-slate-900">Custom</span>
                  </p>
                  <p className="text-sm text-muted-foreground">75+ employees</p>
                  <div className="flex flex-col gap-4 justify-start">
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Everything in Basic</p>
                        <p className="text-muted-foreground text-sm">
                          Plus tailored onboarding support
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Implementation planning</p>
                        <p className="text-muted-foreground text-sm">
                          Map records, teams and workflows before rollout
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Custom support arrangements</p>
                        <p className="text-muted-foreground text-sm">
                          Agree support needs before launch
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2 border-slate-300 hover:border-slate-400" asChild>
                    <a href="/contact.html">Contact Sales <PhoneCall className="w-4 h-4" /></a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Pricing };
