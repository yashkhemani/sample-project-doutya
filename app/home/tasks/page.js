"use client"
import React, { useEffect, useState } from 'react'

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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import toast, { LoaderIcon, Toaster } from 'react-hot-toast';
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"


import Dropdown from '../_components/Dropdown'
import globalApi from '@/app/_services/globalApi'
import InputNumber from '../_components/InputNumber'
import InputText from '../_components/InputText'
import LoadingOverlay from '../_components/LoadingOverlay'
import TimeInput from '../_components/TimeInput'
import RadioInput from '../_components/RadioInput'


const formSchema = z.object({
    taskName: z.string().min(2, { message: "Task Name must be at least 2 characters long." }).max(50, { message: "Title must be at most 50 characters long." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long." }).max(100, { message: "Description must be at most 100 characters long." }),
    challengeID: z.number().positive({ message: "Please select a valid challenge type." }),
    
    startDate: z.date({
      required_error: "A start date is required.",
    }),
    endDate: z.date({
      required_error: "An end date is required.",
    }),
    startTime: z.string().min(1, { message: "Start time is required." }),
    endTime: z.string().min(1, { message: "End time is required." }),
    taskType: z.string().default("map"), 
    verificationMethod: z.string().default("manual"), 
    entryPoints: z.number().min(0).max(100, { message: "Entry points must be between 0 and 100." }),
    rewardPoints: z.number().min(0).max(100, { message: "Reward points must be between 0 and 100." }),
    rewardCash: z.number().min(0).max(100, { message: "Reward Cash must be between 0 and 100." }),
    verificationPoints: z.number().min(0).max(100, { message: "Verification points must be between 0 and 100." }),
    playerLevel: z.string().default("1"), 
    certified: z.string().default("yes"), 
    badge: z.string().default("yes"), 
    latitude: z.number({
      required_error: "Latitude data is required."
    }),
    longitude: z.number({
      required_error: "Longitude data is required."
    }),
    radius: z.number({
      required_error: "Radius is required."
    }),
    createdBy: z.string().default("admin"),
    
  });

  const taskType = [
    { label: "Map", value: "map" },
  ];

  const verifyMethod = [
    { label: "Manual", value: "manual" },
  ];

  
function pages() {

    const [startDate, setStartDate] = useState(null); 

    const [challenges, setChallenges] = useState([]);

    const [isChallengeLoading, setIsChallengeLoading] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const  form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues :{
            taskName: '',
            challengeID: '',
            description: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            taskType: 'map', 
            verificationMethod: 'manual', 
            entryPoints: undefined,
            rewardPoints: undefined,
            rewardCash: undefined,
            verificationPoints: undefined,
            playerLevel: '1',
            certified: 'yes', 
            badge: 'yes', 
            latitude: undefined,
            longitude: undefined,
            radius: undefined,
            createdBy: 'admin',
          },
      });

      const onSubmit = async (values) => {
        console.log("sefesf", values)
        setIsLoading(true);
        try {
          const resp = await globalApi.CreateNewTask(values);
          console.log('Response:', resp);
    
          if (resp && resp.status === 200) {
            toast.success('Task created successfully!');
            // form.reset(); // Resetting the form
          } else {
            toast.error('Failed to create task.');
          }
        } catch (error) {
          console.error('Error creating Task:', error);
          toast.error('Error: Failed to create Task.');
        } finally {
          setIsLoading(false);
        }
        
      }

      const getChallenges = async () => {
        setIsChallengeLoading(true)
        try {
          const resp = await globalApi.GetAllChallenges();
          console.log('Response: of reqqq',resp.data);
          setChallenges(resp.data); 
        } catch (error) {
          console.error('Error Fetching Challenges data:', error);
          toast.error('Error: Failed to Fetch data.');
        }finally {
          setIsChallengeLoading(false);
        }
        
      }

      // Transforming challenges data to match the dropdownFields format
      const challengeList = challenges.map(challenge => ({
        label: challenge.title, // Assuming challenge object has a title property
        value: challenge.challenge_id,    // Assuming challenge object has an id property
      }));

      useEffect(()=>{
        getChallenges() /* Calling when page loads */
      }, [])


      return (
        <div className='w-full px-4'>

          <div className="container mx-auto px-4 bg-slate-100">
                <h1 className='text-3xl mt-3'>Create New Task</h1>
                <p>Create Task</p>
          </div>
          <div className="container mx-auto mt-3 mb-5 p-5 bg-slate-100">
            <Toaster
              position="top-center"
              reverseOrder={false}
              />
            <Form {...form}>
              {isLoading && <LoadingOverlay loadText="Submitting..."/>}
              <form onSubmit={form.handleSubmit(onSubmit)} >
                {/* Title */}
                <FormField
                  control={form.control}
                  name="taskName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a Task Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                {/* Challenge */}
                {/* <Dropdown form={form} name={"challengeID"} label={"Challenge Name"} placeholder={"Select a Challenge"} dropdownFields={challengeList}/> */}
                
                <FormField
                  control={form.control}
                  name="challengeID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Challenge Name</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? challengeList.find(
                                    (type) => type.value === field.value
                                  )?.label
                                : "Select a Challenge"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                        {isChallengeLoading?
                        <div className='flex items-center justify-center p-2'>
                          <LoaderIcon className="mr-2  inline-block animate-spin" />
                          Loading...
                        </div>:
                          <Command>
                            <CommandInput
                              placeholder="Search challenge..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No challenge found.</CommandEmpty>
                              <CommandGroup>
                                {challengeList.map((type) => (
                                  <CommandItem
                                    value={type.label}
                                    key={type.value}
                                    onSelect={() => {
                                      console.log("type.value",type);
                                      form.setValue("challengeID", type.value)
                                    }}
                                  >
                                    {type.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        type.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                  }
                        </PopoverContent>
                      </Popover>
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
                          placeholder="Description about the task"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
              <div className="grid grid-cols-4 grid-rows-1 gap-4 mt-5">
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
    
                <div className="grid grid-cols-4 grid-rows-1 gap-4 mt-5">
                  
                  {/* <!-- First dropdown --> */}
                  <Dropdown form={form} name={"taskType"} label={"Task Type"} placeholder={"Select task Type"} dropdownFields={taskType} isDisabled={true}/>
  
                  {/* <!-- Second dropdown --> */}
                  <Dropdown form={form} name={"verificationMethod"} label={"Verification Method"} placeholder={"Select a  Verification Method"} dropdownFields={verifyMethod} isDisabled={true}/>
                </div>
    
  
    
              <div className="grid grid-cols-4 grid-rows-1 gap-4 mt-5">
                {/* EntryPoints */}
                <InputNumber form={form} name={"entryPoints"} label={"Entry Points"} placeholder={"Enter a value"} />
    
                {/* RewardPoints */}
                <InputNumber form={form} name={"rewardPoints"} label={"Reward Points"} placeholder={"Enter a value"} />
  
                {/* RewardPoints */}
                <InputNumber form={form} name={"rewardCash"} label={"Reward Cash"} placeholder={"Enter a value"} />
  
                {/* RewardPoints */}
                <InputNumber form={form} name={"verificationPoints"} label={"Verification Points"} placeholder={"Enter a value"} />
  
              </div>
    
                {/* Player Level */}
                <InputNumber form={form} name={"playerLevel"} label={"Player Level"} placeholder={"Enter a value"} isDisabled={true}/>
  
              <div className="grid grid-cols-4 grid-rows-1 gap-4 mt-5">
                <RadioInput form={form} name={"certified"} label={"Is Certified"}/>
                <RadioInput form={form} name={"badge"} label={"Badge?"} />
              </div>
              <div className="grid grid-cols-3 grid-rows-1 gap-4 mt-5">
                {/* Lattitude */}
                <InputNumber form={form} name={"latitude"} label={"Latitude"} placeholder={"Enter value"} />
                {/* Longitude */}
                <InputNumber form={form} name={"longitude"} label={"Longitude"} placeholder={"Enter value"} />
                {/* Radius */}
                <InputNumber form={form} name={"radius"} label={"Radius"} placeholder={"Enter value"} />
              </div>
  
              {/* Created By  */}
              <InputText form={form} name={"createdBy"} label={"Created By"} placeholder={"Enter name"} isDisabled={true}/>
    
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

export default pages
