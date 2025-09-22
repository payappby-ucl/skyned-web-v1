"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import {
  ArrowRight,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  MapPin,
  GraduationCap,
  DollarSign,
  Calendar,
  Award,
} from "lucide-react";

export function LoanApplication() {
  const [activeTab, setActiveTab] = useState("country");
  const [formData, setFormData] = useState({
    citizenship: "",
    livingInCanada: "",
    school: "",
    program: "",
    studyLevel: "",
    pgwpEligible: "",
    hasOfferLetter: "",
    loanType: "",
    hasLivingFunds: "",
    hasStarted: "",
    currentGPA: "",
    termStart: "",
    email: "",
  });

  const tabs = [
    { id: "country", label: "Country & Citizenship", icon: MapPin },
    { id: "study", label: "Study Details", icon: GraduationCap },
    { id: "financial", label: "Financial Needs", icon: DollarSign },
    { id: "enrollment", label: "Enrollment & GPA", icon: Calendar },
    { id: "recommendation", label: "Recommendation", icon: Award },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "confirmation", label: "Confirmation", icon: CheckCircle },
  ];

  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex < tabs.length - 1 && tabs[currentIndex + 1]) {
      setActiveTab(tabs[currentIndex + 1]?.id || "country");
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4 grid h-fit w-full grid-cols-7">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex flex-col gap-1 p-3"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden text-xs sm:block">{tab.label}</span>
              <span className="text-xs sm:hidden">{index + 1}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      <TabsContent value="country">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="text-primary h-5 w-5" />
              Where Are You From?
            </CardTitle>
            <CardDescription>
              Help us determine your eligibility based on your citizenship and
              location.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="citizenship">
                What country are you a citizen of?
              </Label>
              <Select
                value={formData.citizenship}
                onValueChange={(value) =>
                  setFormData({ ...formData, citizenship: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your country of citizenship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Are you currently living in Canada?</Label>
              <RadioGroup
                value={formData.livingInCanada}
                onValueChange={(value) =>
                  setFormData({ ...formData, livingInCanada: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="canada-yes" />
                  <Label htmlFor="canada-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="canada-no" />
                  <Label htmlFor="canada-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.citizenship === "excluded" && (
              <div className="bg-destructive/10 border-destructive/20 rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-destructive mt-0.5 h-5 w-5" />
                  <div>
                    <p className="text-destructive text-sm font-medium">
                      Limited Eligibility
                    </p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Unfortunately, students from this country are not
                      currently eligible for Passage loans. Let's see if MPOWER
                      is a better fit.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button onClick={handleNext} className="w-full">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="study">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="text-primary h-5 w-5" />
              About Your Program
            </CardTitle>
            <CardDescription>
              Tell us about your educational program and institution.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="school">What school will you be attending?</Label>
              <Input
                id="school"
                placeholder="Start typing your school name..."
                value={formData.school}
                onChange={(e) =>
                  setFormData({ ...formData, school: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="program">
                What program are you enrolling in?
              </Label>
              <Input
                id="program"
                placeholder="e.g., Computer Science, Business Administration"
                value={formData.program}
                onChange={(e) =>
                  setFormData({ ...formData, program: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>What level of study?</Label>
              <Select
                value={formData.studyLevel}
                onValueChange={(value) =>
                  setFormData({ ...formData, studyLevel: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select study level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="postgraduate">Postgraduate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Is your program PGWP-eligible?</Label>
              <RadioGroup
                value={formData.pgwpEligible}
                onValueChange={(value) =>
                  setFormData({ ...formData, pgwpEligible: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="pgwp-yes" />
                  <Label htmlFor="pgwp-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="pgwp-no" />
                  <Label htmlFor="pgwp-no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-sure" id="pgwp-not-sure" />
                  <Label htmlFor="pgwp-not-sure">Not Sure</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Do you already have an offer/admission letter?</Label>
              <RadioGroup
                value={formData.hasOfferLetter}
                onValueChange={(value) =>
                  setFormData({ ...formData, hasOfferLetter: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="offer-yes" />
                  <Label htmlFor="offer-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="offer-no" />
                  <Label htmlFor="offer-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.hasOfferLetter === "no" && (
              <div className="bg-muted/50 rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-primary mt-0.5 h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium">No Offer Letter Yet?</p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Some loans require a valid offer letter. You may still
                      pre-qualify — continue below.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button onClick={handleNext} className="w-full">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="financial">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="text-primary h-5 w-5" />
              What Do You Need Covered?
            </CardTitle>
            <CardDescription>
              Help us understand your financial requirements for studying
              abroad.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>What type of loan are you looking for?</Label>
              <RadioGroup
                value={formData.loanType}
                onValueChange={(value) =>
                  setFormData({ ...formData, loanType: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tuition-only" id="tuition-only" />
                  <Label htmlFor="tuition-only">Tuition Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tuition-living" id="tuition-living" />
                  <Label htmlFor="tuition-living">
                    Tuition + Living Expenses
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.loanType === "tuition-only" && (
              <div className="space-y-3">
                <Label>
                  Do you have enough funds to cover living expenses on your own?
                </Label>
                <RadioGroup
                  value={formData.hasLivingFunds}
                  onValueChange={(value) =>
                    setFormData({ ...formData, hasLivingFunds: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="living-yes" />
                    <Label htmlFor="living-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="living-no" />
                    <Label htmlFor="living-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {formData.loanType === "tuition-living" && (
              <div className="bg-primary/10 border-primary/20 rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-primary mt-0.5 h-5 w-5" />
                  <div>
                    <p className="text-primary text-sm font-medium">
                      Comprehensive Coverage
                    </p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Passage may offer both tuition and living coverage. We'll
                      verify your eligibility shortly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button onClick={handleNext} className="w-full">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="enrollment">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="text-primary h-5 w-5" />
              Enrollment Status
            </CardTitle>
            <CardDescription>
              Tell us about your current enrollment status and academic
              performance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Have you already started your program?</Label>
              <RadioGroup
                value={formData.hasStarted}
                onValueChange={(value) =>
                  setFormData({ ...formData, hasStarted: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="started-yes" />
                  <Label htmlFor="started-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="started-no" />
                  <Label htmlFor="started-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.hasStarted === "yes" && (
              <div className="space-y-2">
                <Label htmlFor="gpa">What's your current GPA?</Label>
                <Input
                  id="gpa"
                  type="number"
                  step="0.1"
                  min="0"
                  max="4.0"
                  placeholder="e.g., 3.5"
                  value={formData.currentGPA}
                  onChange={(e) =>
                    setFormData({ ...formData, currentGPA: e.target.value })
                  }
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="term-start">
                When does your next school term start?
              </Label>
              <Input
                id="term-start"
                type="date"
                value={formData.termStart}
                onChange={(e) =>
                  setFormData({ ...formData, termStart: e.target.value })
                }
              />
            </div>

            <Button onClick={handleNext} className="w-full">
              Check Eligibility
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="recommendation">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="text-primary h-5 w-5" />
              You're Eligible!
            </CardTitle>
            <CardDescription>
              Based on your profile, here are your loan options.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="bg-green-600/10 rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 mt-1 h-5 w-5" />
                  <div className="flex-1">
                    <p className="text-green-600 font-semibold">MPOWER Loan</p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Based on your GPA, program start date, and school.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-600/10 rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 mt-1 h-5 w-5" />
                  <div className="flex-1">
                    <p className="text-green-600 font-semibold">Passage Loan</p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Based on your program, country, and financial needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-sky-600/5 border-sky-600/20 rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <Award className="text-sky-600 mt-0.5 h-5 w-5" />
                <div>
                  <p className="text-sky-600 text-sm font-medium">
                    Our Recommendation
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    We recommend <strong>MPOWER</strong> as your best match
                    based on your profile. You can continue with this
                    recommendation or explore both options.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <Button onClick={handleNext} className="w-full">
                Proceed with MPOWER
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                className="w-full bg-transparent"
              >
                Proceed with Passage
              </Button>
              <Button variant="ghost" onClick={handleNext} className="w-full">
                Compare Both Options
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="documents">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="text-primary h-5 w-5" />
              Upload Your Documents
            </CardTitle>
            <CardDescription>
              To finalize your pre-approval, we need a few documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              {[
                "Offer Letter",
                "Passport or National ID",
                "Transcripts or GPA Report",
                "Resume/CV",
                "Proof of Address",
                "Bank Statement or Scholarship Letter (if needed)",
                "Immigration Docs (if applicable)",
              ].map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="text-muted-foreground h-5 w-5" />
                    <span className="text-sm font-medium">{doc}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
              ))}
            </div>

            <div className="bg-muted/50 rounded-lg border p-4">
              <p className="text-muted-foreground text-sm">
                <strong>Note:</strong> We will review your documents within 3–5
                business days. If anything is missing, we'll contact you.
              </p>
            </div>

            <Button onClick={handleNext} className="w-full">
              Submit & Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="confirmation">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-primary h-5 w-5" />
              You're Almost There!
            </CardTitle>
            <CardDescription>
              Thank you for submitting your documents. Our team is reviewing
              them.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <CheckCircle className="text-primary h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                Application Submitted Successfully!
              </h3>
              <p className="text-muted-foreground">
                You'll be notified as soon as your loan offer is ready.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address (for updates)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Button className="w-full">Send Updates to Email</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
