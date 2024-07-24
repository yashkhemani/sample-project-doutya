"use client"
import globalApi from '@/app/_services/globalApi';
import { getTodayDate } from '@/utils/commonUtils';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


function CreateTasks() {

    const initialFormData = {
        taskName: '',
        challengeID: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        taskType: 'Map', // Default value for select
        verificationMethod: 'Manual', // Default value for select
        entryPoints: '',
        rewardPoints: '',
        rewardCash: '',
        verificationPoints: '',
        playerLevel: '1',
        createdBy: 'Admin', // Default value for createdBy
        certified: 'yes', // Radio button value
        badge: 'yes', // Radio button value
        latitude: '',
        longitude: '',
        radius: ''
      };

      
    const [minEndDate, setMinEndDate] = useState(getTodayDate());

    // function getTodayDate() {
    //     const today = new Date();
    //     let day = today.getDate();
    //     let month = today.getMonth() + 1; 
    //     const year = today.getFullYear();

    //     // Format day and month with leading zeros if needed
    //     if (day < 10) {
    //         day = '0' + day;
    //     }
    //     if (month < 10) {
    //         month = '0' + month;
    //     }
    //     return `${year}-${month}-${day}`;
    // }
      
    const [formData, setFormData] = useState(initialFormData);
    
    /* Function To add the value to the form data on change */
    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === 'startDate') { /* To set the end date minimum value to start from satartdate */
            setMinEndDate(value);
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        const {
            taskName,
            challengeID,
            description,
            startDate,
            endDate,
            startTime,
            endTime,
            entryPoints,
            rewardPoints,
            rewardCash,
            verificationPoints,
            latitude,
            longitude,
            radius,
        } = formData;

        // Validate required fields
        if (!taskName || !challengeID || !description || !startDate || !endDate || !startTime || !endTime ||
            !entryPoints || !rewardPoints || !rewardCash || !verificationPoints || !latitude || !longitude || !radius) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Validate numeric fields
        if (entryPoints > 100 ||rewardPoints > 100 || rewardCash > 100 || verificationPoints > 100 || entryPoints < 0 || rewardPoints < 1 || rewardCash < 1 || verificationPoints < 1) {
            toast.error("Reward Points, Reward Cash, and Verification Points must be between 1 and 100.");
        }
        console.log('Logg:', formData);
        globalApi.CreateNewTask(formData)
        .then(resp => {
            console.log('Response:', resp);
            // Check if response indicates success 
            if (resp && resp.status === 200) {
                toast.success('Task created successfully!');
                setFormData(initialFormData); /* Resetting the form */

            } else {
                toast.error('Failed to create task.');
            }
        })
        .catch(error => {
            console.error('Error creating task:', error);
            toast.error('Error: Failed to create task.');
        });

    };
    

  return (
    <div className='w-full px-4'>
        <Toaster
        position="top-center"
        reverseOrder={false}
        />
        <div className="container mx-auto px-4 bg-slate-100">
            <h1 className='text-3xl mt-3'>Create Task</h1>
            <p>Create task page</p>
        </div>
        <div className="container mx-auto mt-3 mb-5 p-5 bg-slate-100">
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Task Details</h2>

                        <div className="mt-10 gap-x-6 gap-y-8 ">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Task name
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="taskName"
                                    name="taskName"
                                    type="text"
                                    autoComplete="given-name"
                                    onChange={handleChange}
                                    value={formData.taskName}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <label htmlFor="challengeID" className="block text-sm font-medium leading-6 text-gray-900">
                                    Challenge Id:
                                </label>
                                
                                <input
                                    id="challengeID"
                                    name="challengeID"
                                    type="number"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Enter number"
                                    value={formData.challengeID}
                                    onChange={handleChange}
                                />

                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formData.description}
                                    onChange={handleChange}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the task.</p>

                            </div>

                            <div className='flex mt-4'>
                                <div className="me-5">
        
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Start Date</label>
        
                                        <input 
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            min={getTodayDate()}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
        
                                </div>                     
                                <div className="">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">End Date</label>
                                        <input 
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            min={minEndDate}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                </div>
                            </div>

                            <div className='flex mt-2'>
                                <div className="me-5">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Start Time:</label>
                                    <input 
                                        type="time"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">End Time:</label>
                                    <input 
                                        type="time"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="flex mt-5">

                                <div className='flex-1'>
                                    <label htmlFor="taskType" className="block text-sm font-medium leading-6 text-gray-900">
                                        Task Type
                                    </label>
                                    
                                    <div className="mt-2">
                                        <select
                                        id="taskType"
                                        name="taskType"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        value={formData.taskType}
                                        onChange={handleChange}
                                        >
                                        <option>Map</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='flex-1'>
                                    <label htmlFor="verificationMethod" className="block text-sm font-medium leading-6 text-gray-900">
                                        Verification Method
                                    </label>
                                    
                                    <div className="mt-2">
                                        <select
                                        id="verificationMethod"
                                        name="verificationMethod"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        value={formData.verificationMethod}
                                        onChange={handleChange}
                                        >
                                        <option>Manual</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex mt-5">

                                <div className='flex-1 me-2' >
                                    <label htmlFor="entryPoints" className="block text-sm font-medium leading-6 text-gray-900">
                                        Entry Points:
                                    </label>
                                    
                                    <input
                                        id="entryPoints"
                                        name="entryPoints"
                                        type="number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Enter number"
                                        value={formData.entryPoints}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='flex-1 me-2'>
                                    <label htmlFor="rewardPoints" className="block text-sm font-medium leading-6 text-gray-900">
                                        Reward Points:
                                    </label>
                                    
                                    <input
                                        id="rewardPoints"
                                        name="rewardPoints"
                                        type="number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Enter number"
                                        value={formData.rewardPoints}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='flex-1 me-2'>
                                    <label htmlFor="rewardCash" className="block text-sm font-medium leading-6 text-gray-900">
                                        Reward Cash:
                                    </label>
                                    
                                    <input
                                        id="rewardCash"
                                        name="rewardCash"
                                        type="number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Enter number"
                                        value={formData.rewardCash}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='flex-1 me-2'>
                                    <label htmlFor="verificationPoints" className="block text-sm font-medium leading-6 text-gray-900">
                                        Verification Points:
                                    </label>
                                    
                                    <input
                                        id="verificationPoints"
                                        name="verificationPoints"
                                        type="number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Enter number"
                                        value={formData.verificationPoints}
                                        onChange={handleChange}
                                        
                                    />
                                </div>
                            </div>

                            <div className='mt-5'>
                                    <label htmlFor="playerLevel" className="block text-sm font-medium leading-6 text-gray-900">
                                        Player Level:
                                    </label>
                                    
                                    <input
                                        id="playerLevel"
                                        name="playerLevel"
                                        type="number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Enter number"
                                        value={formData.playerLevel}
                                        onChange={handleChange}
                                        disabled
                                    />
                            </div>

                            <div className='mt-5 flex'>

                                <div className="space-y-4 me-5">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Is Certified?
                                    </label>

                                    <div className="flex items-center space-x-4">
                                        <input
                                        type="radio"
                                        id="certified-yes"
                                        name="certified"
                                        value="yes"
                                        checked={formData.certified === 'yes'}
                                        onChange={handleChange}
                                        className="focus:ring-indigo-600 h-4 w-4 text-indigo-600 border-gray-300"
                                        />

                                        <label htmlFor="certified-yes" className="ml-2 block text-sm font-medium text-gray-700">
                                            Yes
                                        </label>

                                        <input
                                        type="radio"
                                        id="certified-no"
                                        name="certified"
                                        value="no"
                                        checked={formData.certified === 'no'}
                                        onChange={handleChange}
                                        className="focus:ring-indigo-600 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label htmlFor="certified-no" className="ml-2 block text-sm font-medium text-gray-700">
                                        No
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Badge?
                                    </label>

                                    <div className="flex items-center space-x-4">
                                        <input
                                        type="radio"
                                        id="badge-yes"
                                        name="badge"
                                        value="yes"
                                        checked={formData.badge === 'yes'}
                                        onChange={handleChange}
                                        className="focus:ring-indigo-600 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label htmlFor="badge-yes" className="ml-2 block text-sm font-medium text-gray-700">
                                        Yes
                                        </label>

                                        <input
                                        type="radio"
                                        id="badge-no"
                                        name="badge"
                                        value="no"
                                        checked={formData.badge === 'no'}
                                        onChange={handleChange}
                                        className="focus:ring-indigo-600 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label htmlFor="badge-no" className="ml-2 block text-sm font-medium text-gray-700">
                                        No
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Lattitude */}
                            <div className="flex mt-5">

                                <div className='flex-1 me-2' >
                                    <label htmlFor="latitude" className="block text-sm font-medium leading-6 text-gray-900">
                                        Latitude
                                    </label>
                                    
                                    <input
                                        id="latitude"
                                        name="latitude"
                                        type="number"
                                        min={0}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Enter number"
                                        value={formData.latitude}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='flex-1 me-2'>
                                    <label htmlFor="longitude" className="block text-sm font-medium leading-6 text-gray-900">
                                        Longitude:
                                    </label>
                                    
                                    <input
                                        id="longitude"
                                        name="longitude"
                                        type="number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Enter number"
                                        value={formData.longitude}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='flex-1 me-2'>
                                    <label htmlFor="radius" className="block text-sm font-medium leading-6 text-gray-900">
                                        Radius:
                                    </label>
                                    
                                    <input
                                        id="radius"
                                        name="radius"
                                        type="number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Enter number"
                                        value={formData.radius}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div className='mt-5'>
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Created By
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="createdBy"
                                    name="createdBy"
                                    type="text"
                                    autoComplete="name"
                                    defaultValue={'Admin'}
                                    onChange={handleChange}
                                    disabled
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateTasks
