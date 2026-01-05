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
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge>Pricing</Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              Choose the plan that fits your needs. All plans include secure Australian hosting and 24/7 support.
            </p>
          </div>
          <div className="grid pt-20 text-left grid-cols-1 lg:grid-cols-4 w-full gap-8">
            {/* Individual Plan */}
            <Card className="w-full rounded-md">
              <CardHeader>
                <CardTitle>
                  <span className="flex flex-row gap-4 items-center font-normal">
                    Individual
                  </span>
                </CardTitle>
                <CardDescription>
                  Perfect for individuals managing their own credentials and permits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-8 justify-start">
                  <p className="flex flex-row items-center gap-2 text-xl">
                    <span className="text-4xl">$8</span>
                    <span className="text-sm text-muted-foreground">
                      / month
                    </span>
                  </p>
                  <div className="flex flex-col gap-4 justify-start">
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Unlimited credentials</p>
                        <p className="text-muted-foreground text-sm">
                          Store all your permits and certifications
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Expiry tracking</p>
                        <p className="text-muted-foreground text-sm">
                          Automated reminders before expiry
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Secure sharing</p>
                        <p className="text-muted-foreground text-sm">
                          Control who sees your credentials
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-4" asChild>
                    <a href="/contact.html">Get Started <MoveRight className="w-4 h-4" /></a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Starter Plan */}
            <Card className="w-full rounded-md">
              <CardHeader>
                <CardTitle>
                  <span className="flex flex-row gap-4 items-center font-normal">
                    Starter
                  </span>
                </CardTitle>
                <CardDescription>
                  For small businesses managing credentials for their team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-8 justify-start">
                  <p className="flex flex-row items-center gap-2 text-xl">
                    <span className="text-4xl">$99</span>
                    <span className="text-sm text-muted-foreground">
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
                          Manage credentials across your organisation
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Compliance reporting</p>
                        <p className="text-muted-foreground text-sm">
                          Export audit-ready reports
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
                  <Button variant="outline" className="gap-4" asChild>
                    <a href="/contact.html">Get Started <MoveRight className="w-4 h-4" /></a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Basic Plan - Highlighted */}
            <Card className="w-full shadow-2xl rounded-md border-2 border-primary">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>
                    <span className="flex flex-row gap-4 items-center font-normal">
                      Basic
                    </span>
                  </CardTitle>
                  <Badge>Popular</Badge>
                </div>
                <CardDescription>
                  For growing businesses with larger teams and advanced needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-8 justify-start">
                  <p className="flex flex-row items-center gap-2 text-xl">
                    <span className="text-4xl">$199</span>
                    <span className="text-sm text-muted-foreground">
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
                          Plus advanced features
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Advanced reporting</p>
                        <p className="text-muted-foreground text-sm">
                          Custom filters and analytics
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
                  <Button className="gap-4" asChild>
                    <a href="/contact.html">Get Started <MoveRight className="w-4 h-4" /></a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise/Custom Plan */}
            <Card className="w-full rounded-md">
              <CardHeader>
                <CardTitle>
                  <span className="flex flex-row gap-4 items-center font-normal">
                    Enterprise
                  </span>
                </CardTitle>
                <CardDescription>
                  Custom solutions for large organisations with specific requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-8 justify-start">
                  <p className="flex flex-row items-center gap-2 text-xl">
                    <span className="text-4xl">Custom</span>
                  </p>
                  <p className="text-sm text-muted-foreground">75+ employees</p>
                  <div className="flex flex-col gap-4 justify-start">
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Everything in Basic</p>
                        <p className="text-muted-foreground text-sm">
                          Plus enterprise features
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Custom integrations</p>
                        <p className="text-muted-foreground text-sm">
                          API access and integrations
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      <Check className="w-4 h-4 mt-2 text-primary" />
                      <div className="flex flex-col">
                        <p>Dedicated support</p>
                        <p className="text-muted-foreground text-sm">
                          Account manager and 24/7 support
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-4" asChild>
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
