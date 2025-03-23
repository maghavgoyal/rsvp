// "use client"

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { CalendarHeart, Mail, Send, User, Users } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"

// const formSchema = z.object({
//   name: z.string().min(2, { message: "Please enter your name" }),
//   email: z.string().email({ message: "Please enter a valid email address" }),
//   attending: z.enum(["yes", "no"], {
//     required_error: "Please select if you're attending",
//   }),
//   guests: z.string().optional(),
//   dietaryRestrictions: z.string().optional(),
//   songRequest: z.string().optional(),
// })

// type FormValues = z.infer<typeof formSchema>

// export default function RsvpForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       attending: undefined,
//       guests: "0",
//       dietaryRestrictions: "",
//       songRequest: "",
//     },
//   })

//   async function onSubmit(data: FormValues) {
//     setIsSubmitting(true)

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500))

//     console.log(data)
//     setIsSubmitting(false)
//     setIsSubmitted(true)
//   }

//   if (isSubmitted) {
//     return (
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle className="text-center text-2xl">Thank You!</CardTitle>
//           <CardDescription className="text-center">
//             Your RSVP has been received. We look forward to celebrating with you!
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="text-center">
//           <CalendarHeart className="mx-auto h-16 w-16 text-pink-400 mb-4" />
//           <p>We'll send you a confirmation email shortly.</p>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>RSVP</CardTitle>
//         <CardDescription>Please fill out this form to let us know if you can attend.</CardDescription>
//       </CardHeader>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <CardContent className="space-y-4 sm:space-y-6">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Full Name</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                       <Input className="pl-10" placeholder="John Smith" {...field} />
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                       <Input className="pl-10" placeholder="you@example.com" type="email" {...field} />
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="attending"
//               render={({ field }) => (
//                 <FormItem className="space-y-3">
//                   <FormLabel>Will you be attending?</FormLabel>
//                   <FormControl>
//                     <RadioGroup
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       className="flex flex-col space-y-1"
//                     >
//                       <FormItem className="flex items-center space-x-2 sm:space-x-3 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="yes" />
//                         </FormControl>
//                         <FormLabel className="font-normal text-sm sm:text-base">Yes, I'll be there</FormLabel>
//                       </FormItem>
//                       <FormItem className="flex items-center space-x-2 sm:space-x-3 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="no" />
//                         </FormControl>
//                         <FormLabel className="font-normal text-sm sm:text-base">Sorry, I can't make it</FormLabel>
//                       </FormItem>
//                     </RadioGroup>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {form.watch("attending") === "yes" && (
//               <>
//                 <FormField
//                   control={form.control}
//                   name="guests"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Number of Guests (including yourself)</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <SelectTrigger className="pl-10">
//                               <SelectValue placeholder="Select number of guests" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="1">1 (Just me)</SelectItem>
//                               <SelectItem value="2">2</SelectItem>
//                               <SelectItem value="3">3</SelectItem>
//                               <SelectItem value="4">4</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="dietaryRestrictions"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Dietary Restrictions</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Please let us know if you have any dietary restrictions or allergies"
//                           className="resize-none"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormDescription>Example: If you don't eat Garlic, please indicate here.</FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="songRequest"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Song Request</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="What song would get you on the dance floor?"
//                           className="resize-none"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormDescription>Optional: Suggest a song for our playlist.</FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </>
//             )}
//           </CardContent>
//           <CardFooter className="px-4 sm:px-6">
//             <Button type="submit" className="w-full" disabled={isSubmitting}>
//               {isSubmitting ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Submitting...
//                 </>
//               ) : (
//                 <>
//                   <Send className="mr-2 h-4 w-4" /> Submit RSVP
//                 </>
//               )}
//             </Button>
//           </CardFooter>
//         </form>
//       </Form>
//     </Card>
//   )
// }

