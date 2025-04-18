
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail } from "lucide-react";

export function HelpFaqView() {
  const faqs = [
    {
      question: "How do I add new inventory items?",
      answer: "Navigate to the Inventory section, click on 'Add Inventory' button in the top right corner. Fill in the required fields in the form and submit."
    },
    {
      question: "How do I process a transfer between locations?",
      answer: "Go to the Transfers section, click 'Create New Transfer' button. Select the source and destination locations, add items to the transfer list, and submit the request."
    },
    {
      question: "What do the different inventory status indicators mean?",
      answer: "Normal (green): Stock level is adequate. Low (orange): Stock level is below the reorder threshold. Critical (red): Stock level is critically low and needs immediate attention."
    },
    {
      question: "How do I approve a procurement request?",
      answer: "In the Procurement section, find the request with 'pending' status. Click on the checkmark button to approve or the X button to reject the request."
    },
    {
      question: "Can I export reports for offline analysis?",
      answer: "Yes, all reports can be exported. Go to the Reports section, generate the desired report, then click the 'Export' button in the top right corner."
    },
    {
      question: "How do I reset my password?",
      answer: "Click on your profile in the top right, select 'Settings', then go to the 'Security' tab. Follow the instructions to reset your password."
    },
    {
      question: "What permissions do different user roles have?",
      answer: "Administrators have full access. Warehouse Managers can manage inventory and transfers. Procurement Officers can manage procurement requests and approvals. Each role has restricted access based on their responsibilities."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Help & FAQ</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help topics..."
              className="pl-10"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions and answers</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
              <CardDescription>Contact our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Our support team is available Monday through Friday from 9am to 5pm.
              </p>
              <Button className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Helpful guides and tutorials</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {["User Manual", "Video Tutorials", "System Requirements", "Release Notes"].map((resource) => (
                  <li key={resource}>
                    <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400">
                      {resource}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
