"use client"

import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

/* Imports For ShadCN  UI */
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar"
import Dropdown from '../_components/Dropdown'
import globalApi from '@/app/_services/globalApi'
import toast, { LoaderIcon, Toaster } from 'react-hot-toast';
import InputNumber from '../_components/InputNumber'
import InputText from '../_components/InputText'
import LoadingOverlay from '../_components/LoadingOverlay'
import TimeInput from '../_components/TimeInput'

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters long." }).max(50, { message: "Title must be at most 50 characters long." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long." }).max(100, { message: "Description must be at most 100 characters long." }),
  challengeType: z.string().min(1, { message: "Please select a challenge type." }),
  frequency: z.string().min(1, { message: "Please select a frequency." }),
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  endDate: z.date({
    required_error: "An end date is required.",
  }),
  startTime: z.string().min(1, { message: "Start time is required." }),
  endTime: z.string().min(1, { message: "End time is required." }),
  entryPoints: z.number().min(0).max(100, { message: "Entry points must be between 0 and 100." }),
  rewardPoints: z.number().min(0).max(100, { message: "Reward points must be between 0 and 100." }),
  level: z.string().default("1"), 
  createdBy: z.string().default("Admin"),
  participants: z.number().min(0).max(100, { message: "Participants count is required." }),
  arena: z.string().min(1, { message: "Arena is required." }),
  districtId: z.number().min(0).max(100, { message: "District ID is required." }),
  visit: z.string().min(1, { message: "Visit is required." }),
  active: z.string().min(1, { message: "Active status is required." }),
  days: z.string().default("0"),
  referralCount: z.string().default("0"),
  openFor: z.string().min(1, { message: "Open for is required." }),
  likeBased: z.string().min(1, { message: "Like based is required." }),
  live: z.string().min(1, { message: "Live status is required." }),
  questions: z.string().default("0"),
  expType: z.string().min(1, { message: "Experience type is required." }),
  rewards: z.string().min(1, { message: "Rewards are required." }),
});

const challengeType = [
  { label: "Ordered", value: "Ordered" },
  { label: "UnOrdered", value: "UnOrdered" },
];

const enumType = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const frequencyOptions = [
  { label: "Challenges", value: "Challenges" },
  { label: "Daily", value: "Daily" },
  { label: "Bootcamp", value: "Bootcamp" },
  { label: "Contest", value: "Contest" },
  { label: "Treasure", value: "Treasure" },
  { label: "Referral", value: "Referral" },
  { label: "Streak", value: "Streak" },
  { label: "Refer", value: "Refer" },
  { label: "Quiz", value: "Quiz" },
  { label: "Food", value: "Food" },
  { label: "Experience", value: "Experience" },
];

const openFor = [
  { label: "Everyone", value: "Everyone" },
  { label: "Location", value: "Location" },
  { label: "Specific", value: "Specific" },
];

const expTypes = [
  { label: "Briyani", value: "Briyani" },
  { label: "Breakfast", value: "Breakfast" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Arts", value: "Arts" },
];

function page() {
  const [startDate, setStartDate] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  const  form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      challengeType: "",
      frequency:"",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      entryPoints: undefined,
      rewardPoints: undefined,
      level: "1",
      createdBy: "Admin",
      participants: undefined,
      arena: "",
      districtId: undefined,
      visit: "",
      active: "",
      days: "0",
      referralCount: "0",
      openFor: "",
      likeBased: "",
      live: "",
      questions: "0",
      expType: "",
      rewards: ""
    },
  });

  const onSubmit = async (values) => {
    setTimeout(() => {
      console.log("This message is delayed by 3 seconds.");
    }, 3000);
    setIsLoading(true);
    try {
      const resp = await globalApi.CreateNewChallenge(values);
      console.log('Response:', resp);

      if (resp && resp.status === 200) {
        toast.success('Task created Challenge!');
        // form.reset(); // Resetting the form
      } else {
        toast.error('Failed to create Challenge.');
      }
    } catch (error) {
      console.error('Error creating Challenge:', error);
      toast.error('Error: Failed to create Challenge.');
    } finally {
      setIsLoading(false);
    }
    
  }
  

  return (
    <div className='w-full px-4'>
      <div className="container mx-auto px-4 bg-slate-100">
            <h1 className='text-3xl mt-3'>Create Challenge</h1>
            <p>Create Challenge</p>
      </div>
      <div className="container mx-auto mt-3 mb-5 p-5 bg-slate-100">
        <Toaster
          position="top-center"
          reverseOrder={false}
          />
        <Form {...form}>
          {isLoading && <LoadingOverlay loadText={"Submitting..."}/>}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your challenge name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description about the challenge"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-4 grid-rows-1 gap-4">
               {/* <!-- First dropdown --> */}
               <Dropdown form={form} name={"challengeType"} label={"Challenge Type"} placeholder={"Select Challenge Type"} dropdownFields={challengeType}/>

               {/* <!-- Second dropdown --> */}
              <Dropdown form={form} name={"frequency"} label={"Frequency"} placeholder={"Select Frequency Type"} dropdownFields={frequencyOptions}/>

            </div>

          <div className="grid grid-cols-4 grid-rows-1 gap-4">
              {/* DAte Range */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          // onSelect={field.onChange}
                          onSelect={(date) => {
                            field.onChange(date);
                            setStartDate(date); 
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            startDate ? date < startDate : date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

            {/* Start Time */}
            <TimeInput form={form} name={"startTime"} label={"Start Time"}/>

            {/* End Time  */}
            <TimeInput form={form} name={"endTime"} label={"End Time"}/>
          </div>

          <div className="grid grid-cols-4 grid-rows-4 gap-4">
            {/* EntryPoints */}
            <InputNumber form={form} name={"entryPoints"} label={"Entry Points"} placeholder={"Enter a value"} />

            {/* RewardPoints */}
            <InputNumber form={form} name={"rewardPoints"} label={"Reward Points"} placeholder={"Enter a value"} />

            {/* Level */}
            <InputNumber form={form} name={"level"} label={"Level"} placeholder={"Enter a value"} isDisabled={true}/>

            {/* Created By */}
            <InputText form={form} name={"createdBy"} label={"Created By"} placeholder={"Enter name"} isDisabled={true}/>

            {/* Participants Count */}
            <InputNumber form={form} name={"participants"} label={"Participants Count"} placeholder={"Enter a value"} />

            {/* Arena */}
            <Dropdown form={form} name={"arena"} label={"Arena"} placeholder={"Select"} dropdownFields={enumType}/>

            {/* DistrictId */}
            <InputNumber form={form} name={"districtId"} label={"District Id"} placeholder={"Enter an id"} />
            
            {/* Visit */}
            <Dropdown form={form} name={"visit"} label={"Visit"} placeholder={"Select"} dropdownFields={enumType}/>

            {/* Active */}
            <Dropdown form={form} name={"active"} label={"Active"} placeholder={"Select"} dropdownFields={enumType}/>
            
            {/* No of Days */}
            <InputNumber form={form} name={"days"} label={"Days"} placeholder={"Enter no of days"} isDisabled={true}/>

            {/* Refferal */}
            <InputNumber form={form} name={"referralCount"} label={"Referral Count"} placeholder={"Enter a value"} isDisabled={true}/>

            {/* Open For */}
            <Dropdown form={form} name={"openFor"} label={"Open For"} placeholder={"Select"} dropdownFields={openFor}/>


            {/* Likebased */}
            <Dropdown form={form} name={"likeBased"} label={"Like Based"} placeholder={"Select"} dropdownFields={enumType}/>

            {/* Live */}
            <Dropdown form={form} name={"live"} label={"Live"} placeholder={"Select"} dropdownFields={enumType}/>

            {/* Questions */}
            <InputNumber form={form} name={"questions"} label={"Questions"} placeholder={"Enter a value"} isDisabled={true}/>

            {/* Exp Type */}
            <Dropdown form={form} name={"expType"} label={"Exp Type"} placeholder={"Select exp type"} dropdownFields={expTypes}/>

            {/* Rewards */}
              <Dropdown form={form} name={"rewards"} label={"Rewards"} placeholder={"Select"} dropdownFields={enumType}/>
          </div>


          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoaderIcon className="mr-2 inline-block animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
          </form>
          
        </Form>


      </div>


      
    </div>
  )
}

export default page
