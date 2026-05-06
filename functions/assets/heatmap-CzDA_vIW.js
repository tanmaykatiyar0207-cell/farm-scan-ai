import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect, useMemo } from "react";
import { s as supabase } from "./router-B23tt4C4.js";
import { Map as Map$1, Search, MapPin, Clock, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import "@tanstack/react-router";
import "react-i18next";
import "@supabase/supabase-js";
import "i18next";
const MOCK_DATA = [
  {
    "id": "r0",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 12.9864,
    "lon": 77.7778,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-15T13:52:24.537Z"
  },
  {
    "id": "r1",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "High",
    "lat": 29.7683,
    "lon": 77.835,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-06T02:32:24.538Z"
  },
  {
    "id": "r2",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "High",
    "lat": 19.8642,
    "lon": 75.3968,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-05-01T21:06:24.538Z"
  },
  {
    "id": "r3",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "High",
    "lat": 25.4692,
    "lon": 75.773,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-16T02:57:24.538Z"
  },
  {
    "id": "r4",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "High",
    "lat": 17.1104,
    "lon": 78.4938,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-30T07:21:24.538Z"
  },
  {
    "id": "r5",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 22.925,
    "lon": 75.9553,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-24T02:08:24.538Z"
  },
  {
    "id": "r6",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 25.7945,
    "lon": 91.8529,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-05-03T00:58:24.538Z"
  },
  {
    "id": "r7",
    "disease": "Septoria Leaf Spot",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 11.451,
    "lon": 78.3089,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-23T12:26:24.538Z"
  },
  {
    "id": "r8",
    "disease": "Common Rust",
    "crop": "Maize",
    "severity": "Low",
    "lat": 25.4393,
    "lon": 75.7902,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-30T18:58:24.538Z"
  },
  {
    "id": "r9",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 21.185,
    "lon": 79.0763,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-12T12:00:24.538Z"
  },
  {
    "id": "r10",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 19.7097,
    "lon": 73.6264,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-10T21:14:24.538Z"
  },
  {
    "id": "r11",
    "disease": "Early Blight",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 26.8136,
    "lon": 75.5692,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-23T23:48:24.538Z"
  },
  {
    "id": "r12",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "High",
    "lat": 22.9553,
    "lon": 75.9121,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-01T19:34:24.538Z"
  },
  {
    "id": "r13",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "High",
    "lat": 10.6893,
    "lon": 78.5422,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-19T18:01:24.538Z"
  },
  {
    "id": "r14",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "High",
    "lat": 13.1518,
    "lon": 79.9765,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-13T01:57:24.538Z"
  },
  {
    "id": "r15",
    "disease": "Smut",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 30.058,
    "lon": 74.8291,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-27T19:04:24.538Z"
  },
  {
    "id": "r16",
    "disease": "Tomato Leaf Curl",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 18.2358,
    "lon": 74.1307,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-05-03T01:39:24.538Z"
  },
  {
    "id": "r17",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "Low",
    "lat": 17.1719,
    "lon": 78.5853,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-05-01T00:51:24.538Z"
  },
  {
    "id": "r18",
    "disease": "Karnal Bunt",
    "crop": "Wheat",
    "severity": "High",
    "lat": 26.6923,
    "lon": 83.1725,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-07T05:52:24.538Z"
  },
  {
    "id": "r19",
    "disease": "Boll Rot",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 30.8069,
    "lon": 75.8932,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-14T12:42:24.538Z"
  },
  {
    "id": "r20",
    "disease": "Early Blight",
    "crop": "Potato",
    "severity": "High",
    "lat": 29.9884,
    "lon": 77.8174,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-16T20:05:24.538Z"
  },
  {
    "id": "r21",
    "disease": "Sheath Blight",
    "crop": "Rice",
    "severity": "High",
    "lat": 18.5965,
    "lon": 77.9447,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-10T15:19:24.538Z"
  },
  {
    "id": "r22",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 16.0873,
    "lon": 80.2734,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-27T21:40:24.538Z"
  },
  {
    "id": "r23",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 30.2042,
    "lon": 77.7484,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-11T03:44:24.538Z"
  },
  {
    "id": "r24",
    "disease": "Cercospora Leaf Spot",
    "crop": "Banana",
    "severity": "High",
    "lat": 18.5686,
    "lon": 77.8644,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-13T22:22:24.538Z"
  },
  {
    "id": "r25",
    "disease": "Fusarium Wilt",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 22.9893,
    "lon": 76.0162,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-09T18:01:24.538Z"
  },
  {
    "id": "r26",
    "disease": "Fusarium Head Blight",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 29.9679,
    "lon": 77.3768,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-30T08:57:24.538Z"
  },
  {
    "id": "r27",
    "disease": "Target Spot",
    "crop": "Cotton",
    "severity": "High",
    "lat": 25.5849,
    "lon": 85.1782,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-08T12:12:24.538Z"
  },
  {
    "id": "r28",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "High",
    "lat": 12.5859,
    "lon": 76.9358,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-28T23:29:24.538Z"
  },
  {
    "id": "r29",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 26.9389,
    "lon": 83.4685,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-28T04:19:24.538Z"
  },
  {
    "id": "r30",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "Low",
    "lat": 16.7014,
    "lon": 74.0107,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-24T14:59:24.538Z"
  },
  {
    "id": "r31",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "High",
    "lat": 33.8337,
    "lon": 74.6704,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-15T08:14:24.538Z"
  },
  {
    "id": "r32",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "Low",
    "lat": 16.9281,
    "lon": 74.1479,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-05-02T01:24:24.538Z"
  },
  {
    "id": "r33",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "High",
    "lat": 31.3965,
    "lon": 77.0924,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-20T01:31:24.538Z"
  },
  {
    "id": "r34",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "High",
    "lat": 27.4203,
    "lon": 77.7745,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-04T23:18:24.538Z"
  },
  {
    "id": "r35",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 9.9631,
    "lon": 76.1052,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-24T22:49:24.538Z"
  },
  {
    "id": "r36",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "Low",
    "lat": 30.513,
    "lon": 77.8613,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-15T07:31:24.538Z"
  },
  {
    "id": "r37",
    "disease": "Pokkah Boeng",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 27.3874,
    "lon": 78.0571,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-22T11:11:24.538Z"
  },
  {
    "id": "r38",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Low",
    "lat": 15.5496,
    "lon": 73.9185,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-15T04:50:24.538Z"
  },
  {
    "id": "r39",
    "disease": "Boll Rot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 17.5838,
    "lon": 78.2294,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-05-04T05:41:24.538Z"
  },
  {
    "id": "r40",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "High",
    "lat": 22.9979,
    "lon": 72.8298,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-12T04:27:24.538Z"
  },
  {
    "id": "r41",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Low",
    "lat": 26.3041,
    "lon": 91.7511,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-24T20:47:24.538Z"
  },
  {
    "id": "r42",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 30.7773,
    "lon": 75.6382,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-06T12:50:24.538Z"
  },
  {
    "id": "r43",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 22.8407,
    "lon": 72.619,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-25T03:38:24.538Z"
  },
  {
    "id": "r44",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "High",
    "lat": 21.0533,
    "lon": 78.8466,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-05-03T19:08:24.538Z"
  },
  {
    "id": "r45",
    "disease": "Grassy Shoot",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 28.7154,
    "lon": 77.1677,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-04-27T08:00:24.538Z"
  },
  {
    "id": "r46",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "High",
    "lat": 26.558,
    "lon": 83.3072,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-15T01:30:24.538Z"
  },
  {
    "id": "r47",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "Low",
    "lat": 24.7429,
    "lon": 85.0964,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-29T07:04:24.538Z"
  },
  {
    "id": "r48",
    "disease": "Tungro",
    "crop": "Rice",
    "severity": "Low",
    "lat": 23.8157,
    "lon": 87.06,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-11T07:03:24.538Z"
  },
  {
    "id": "r49",
    "disease": "Sheath Blight",
    "crop": "Rice",
    "severity": "High",
    "lat": 16.8515,
    "lon": 74.031,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-25T23:58:24.538Z"
  },
  {
    "id": "r50",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "High",
    "lat": 9.9942,
    "lon": 78.0608,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-09T20:40:24.538Z"
  },
  {
    "id": "r51",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "High",
    "lat": 11.6568,
    "lon": 77.8607,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-20T04:21:24.538Z"
  },
  {
    "id": "r52",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 32.813,
    "lon": 75.0712,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-04-28T06:18:24.538Z"
  },
  {
    "id": "r53",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Low",
    "lat": 25.2214,
    "lon": 76.023,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-21T21:58:24.538Z"
  },
  {
    "id": "r54",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "High",
    "lat": 16.7388,
    "lon": 74.3062,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-15T09:11:24.538Z"
  },
  {
    "id": "r55",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Low",
    "lat": 17.5689,
    "lon": 75.9788,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-22T23:35:24.538Z"
  },
  {
    "id": "r56",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 9.6449,
    "lon": 78.0088,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-05-02T03:04:24.538Z"
  },
  {
    "id": "r57",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 25.4149,
    "lon": 85.1106,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-29T23:06:24.538Z"
  },
  {
    "id": "r58",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 21.3084,
    "lon": 79.0976,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-21T02:47:24.538Z"
  },
  {
    "id": "r59",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 19.9589,
    "lon": 75.378,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-30T09:06:24.538Z"
  },
  {
    "id": "r60",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "Low",
    "lat": 32.5451,
    "lon": 74.8315,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-04-27T10:39:24.538Z"
  },
  {
    "id": "r61",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 9.8771,
    "lon": 76.3294,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-16T06:52:24.538Z"
  },
  {
    "id": "r62",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "High",
    "lat": 18.7509,
    "lon": 78.3382,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-10T05:48:24.538Z"
  },
  {
    "id": "r63",
    "disease": "Tomato Late Blight",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 18.9535,
    "lon": 72.7382,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-30T06:51:24.538Z"
  },
  {
    "id": "r64",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "Low",
    "lat": 22.8017,
    "lon": 75.7797,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-07T17:51:24.538Z"
  },
  {
    "id": "r65",
    "disease": "Karnal Bunt",
    "crop": "Wheat",
    "severity": "High",
    "lat": 21.3805,
    "lon": 78.8402,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-18T17:47:24.538Z"
  },
  {
    "id": "r66",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 23.0112,
    "lon": 72.818,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-05-03T23:26:24.538Z"
  },
  {
    "id": "r67",
    "disease": "Tomato Late Blight",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 26.3627,
    "lon": 78.0341,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-18T17:37:24.538Z"
  },
  {
    "id": "r68",
    "disease": "Pokkah Boeng",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 23.4805,
    "lon": 79.9296,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-20T07:47:24.538Z"
  },
  {
    "id": "r69",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 18.7787,
    "lon": 73.564,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-08T06:56:24.538Z"
  },
  {
    "id": "r70",
    "disease": "Early Blight",
    "crop": "Tomato",
    "severity": "High",
    "lat": 25.7566,
    "lon": 92.0044,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-27T21:44:24.538Z"
  },
  {
    "id": "r71",
    "disease": "Pokkah Boeng",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 30.2098,
    "lon": 74.6882,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-05-02T00:20:24.538Z"
  },
  {
    "id": "r72",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "Low",
    "lat": 22.9983,
    "lon": 72.6315,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-24T07:45:24.538Z"
  },
  {
    "id": "r73",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 21.3074,
    "lon": 78.9932,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-30T14:02:24.538Z"
  },
  {
    "id": "r74",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 17.1852,
    "lon": 78.3123,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-20T12:43:24.538Z"
  },
  {
    "id": "r75",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "Low",
    "lat": 28.756,
    "lon": 77.0399,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-04-15T17:07:24.538Z"
  },
  {
    "id": "r76",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 27.8582,
    "lon": 73.5337,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-24T21:26:24.538Z"
  },
  {
    "id": "r77",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "Low",
    "lat": 17.9163,
    "lon": 79.4113,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-16T04:28:24.538Z"
  },
  {
    "id": "r78",
    "disease": "Grassy Shoot",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 9.7057,
    "lon": 76.0627,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-30T22:11:24.538Z"
  },
  {
    "id": "r79",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "High",
    "lat": 30.0627,
    "lon": 78.2585,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-22T08:03:24.538Z"
  },
  {
    "id": "r80",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 30.094,
    "lon": 77.3106,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-01T14:19:24.538Z"
  },
  {
    "id": "r81",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 19.9102,
    "lon": 75.3096,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-19T15:42:24.538Z"
  },
  {
    "id": "r82",
    "disease": "Sheath Blight",
    "crop": "Rice",
    "severity": "Low",
    "lat": 22.4181,
    "lon": 88.5637,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-29T11:00:24.538Z"
  },
  {
    "id": "r83",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 26.8801,
    "lon": 88.5308,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-07T19:23:24.538Z"
  },
  {
    "id": "r84",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 26.967,
    "lon": 83.5828,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-22T11:58:24.538Z"
  },
  {
    "id": "r85",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "High",
    "lat": 30.8639,
    "lon": 77.1439,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-27T14:46:24.538Z"
  },
  {
    "id": "r86",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "High",
    "lat": 15.4071,
    "lon": 73.8381,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-17T22:30:24.538Z"
  },
  {
    "id": "r87",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "High",
    "lat": 17.6718,
    "lon": 79.7883,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-05-03T11:27:24.538Z"
  },
  {
    "id": "r88",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 26.3651,
    "lon": 78.3697,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-29T21:26:24.538Z"
  },
  {
    "id": "r89",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "High",
    "lat": 19.3047,
    "lon": 73.1398,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-30T18:25:24.538Z"
  },
  {
    "id": "r90",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 19.7548,
    "lon": 73.8214,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-07T04:34:24.538Z"
  },
  {
    "id": "r91",
    "disease": "Mosaic",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 17.7107,
    "lon": 75.9394,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-05T23:52:24.538Z"
  },
  {
    "id": "r92",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 18.6108,
    "lon": 78.3304,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-19T15:50:24.538Z"
  },
  {
    "id": "r93",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "High",
    "lat": 17.4663,
    "lon": 75.6952,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-24T19:49:24.538Z"
  },
  {
    "id": "r94",
    "disease": "Tomato Late Blight",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 27.7794,
    "lon": 73.2955,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-06T13:04:24.538Z"
  },
  {
    "id": "r95",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "High",
    "lat": 13.3114,
    "lon": 80.5322,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-09T04:01:24.538Z"
  },
  {
    "id": "r96",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 10.1272,
    "lon": 78.3019,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-15T05:52:24.538Z"
  },
  {
    "id": "r97",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "High",
    "lat": 16.6067,
    "lon": 74.3578,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-19T06:43:24.538Z"
  },
  {
    "id": "r98",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 28.935,
    "lon": 77.3544,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-04-10T17:31:24.538Z"
  },
  {
    "id": "r99",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "High",
    "lat": 29.043,
    "lon": 76.5875,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-18T00:47:24.538Z"
  },
  {
    "id": "r100",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "High",
    "lat": 12.8222,
    "lon": 77.3098,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-09T05:44:24.538Z"
  },
  {
    "id": "r101",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Low",
    "lat": 18.9221,
    "lon": 72.7947,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-10T07:10:24.538Z"
  },
  {
    "id": "r102",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 23.5576,
    "lon": 87.1036,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-12T02:55:24.538Z"
  },
  {
    "id": "r103",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 9.6998,
    "lon": 78.3154,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-16T02:44:24.538Z"
  },
  {
    "id": "r104",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 12.9406,
    "lon": 80.4,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-18T04:41:24.538Z"
  },
  {
    "id": "r105",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 31.1105,
    "lon": 76.1177,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-05-02T21:06:24.538Z"
  },
  {
    "id": "r106",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 12.6481,
    "lon": 75.0488,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-24T22:32:24.538Z"
  },
  {
    "id": "r107",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 17.6973,
    "lon": 79.7531,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-08T08:11:24.538Z"
  },
  {
    "id": "r108",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "High",
    "lat": 23.2039,
    "lon": 72.3718,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-18T00:39:24.538Z"
  },
  {
    "id": "r109",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "Low",
    "lat": 18.4743,
    "lon": 73.9406,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-05-03T02:56:24.538Z"
  },
  {
    "id": "r110",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 27.2065,
    "lon": 75.8556,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-13T14:23:24.538Z"
  },
  {
    "id": "r111",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "High",
    "lat": 16.7564,
    "lon": 74.404,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-12T22:05:24.538Z"
  },
  {
    "id": "r112",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "Low",
    "lat": 26.2373,
    "lon": 78.4212,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-30T06:47:24.538Z"
  },
  {
    "id": "r113",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 31.4906,
    "lon": 74.6874,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-12T00:25:24.538Z"
  },
  {
    "id": "r114",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 10.6664,
    "lon": 78.5615,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-05-03T03:30:24.538Z"
  },
  {
    "id": "r115",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 15.6277,
    "lon": 73.6085,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-18T21:57:24.538Z"
  },
  {
    "id": "r116",
    "disease": "Cercospora Leaf Spot",
    "crop": "Banana",
    "severity": "Low",
    "lat": 32.6745,
    "lon": 74.6724,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-04-20T16:52:24.538Z"
  },
  {
    "id": "r117",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "Low",
    "lat": 26.4558,
    "lon": 78.1454,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-18T15:13:24.538Z"
  },
  {
    "id": "r118",
    "disease": "Cercospora Leaf Spot",
    "crop": "Banana",
    "severity": "High",
    "lat": 20.1531,
    "lon": 74.0395,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-22T08:09:24.538Z"
  },
  {
    "id": "r119",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "High",
    "lat": 31.0331,
    "lon": 77.082,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-30T11:57:24.538Z"
  },
  {
    "id": "r120",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "High",
    "lat": 10.5146,
    "lon": 78.9447,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-08T09:59:24.538Z"
  },
  {
    "id": "r121",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 10.8667,
    "lon": 78.9536,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-12T05:48:24.538Z"
  },
  {
    "id": "r122",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Low",
    "lat": 17.3155,
    "lon": 78.3977,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-08T05:31:24.538Z"
  },
  {
    "id": "r123",
    "disease": "Tungro",
    "crop": "Rice",
    "severity": "High",
    "lat": 31.6875,
    "lon": 75.0807,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-25T06:27:24.538Z"
  },
  {
    "id": "r124",
    "disease": "Powdery Mildew",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 30.3305,
    "lon": 75.0359,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-05T18:30:24.538Z"
  },
  {
    "id": "r125",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Low",
    "lat": 31.6534,
    "lon": 75.1656,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-05-03T11:15:24.538Z"
  },
  {
    "id": "r126",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 26.7293,
    "lon": 88.208,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-10T23:21:24.538Z"
  },
  {
    "id": "r127",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 23.0049,
    "lon": 75.606,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-13T17:32:24.538Z"
  },
  {
    "id": "r128",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "Low",
    "lat": 24.9872,
    "lon": 75.8052,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-28T17:29:24.538Z"
  },
  {
    "id": "r129",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "High",
    "lat": 18.3581,
    "lon": 73.6575,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-25T01:07:24.538Z"
  },
  {
    "id": "r130",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 17.7349,
    "lon": 79.6352,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-15T20:11:24.538Z"
  },
  {
    "id": "r131",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 22.9208,
    "lon": 72.7828,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-28T00:44:24.538Z"
  },
  {
    "id": "r132",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "Low",
    "lat": 10.2073,
    "lon": 77.8637,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-29T18:42:24.538Z"
  },
  {
    "id": "r133",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 23.0022,
    "lon": 75.5456,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-16T10:56:24.538Z"
  },
  {
    "id": "r134",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 23.4067,
    "lon": 87.0855,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-20T17:50:24.538Z"
  },
  {
    "id": "r135",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 16.9728,
    "lon": 74.3009,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-18T01:13:24.538Z"
  },
  {
    "id": "r136",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 26.383,
    "lon": 91.6967,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-27T19:45:24.538Z"
  },
  {
    "id": "r137",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 29.7146,
    "lon": 77.5913,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-03T00:25:24.538Z"
  },
  {
    "id": "r138",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 28.1565,
    "lon": 73.0927,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-22T11:10:24.538Z"
  },
  {
    "id": "r139",
    "disease": "Fusarium Wilt",
    "crop": "Cotton",
    "severity": "High",
    "lat": 22.9874,
    "lon": 75.5152,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-06T10:38:24.538Z"
  },
  {
    "id": "r140",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 16.3592,
    "lon": 80.26,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-21T11:38:24.538Z"
  },
  {
    "id": "r141",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 10.7133,
    "lon": 78.801,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-29T10:53:24.538Z"
  },
  {
    "id": "r142",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "Low",
    "lat": 27.4169,
    "lon": 78.1954,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-09T13:40:24.538Z"
  },
  {
    "id": "r143",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "High",
    "lat": 29.9535,
    "lon": 77.3656,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-05T13:31:24.538Z"
  },
  {
    "id": "r144",
    "disease": "Grassy Shoot",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 31.1198,
    "lon": 75.8248,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-20T17:45:24.538Z"
  },
  {
    "id": "r145",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 12.916,
    "lon": 77.4484,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-29T00:52:24.538Z"
  },
  {
    "id": "r146",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 27.0206,
    "lon": 88.4108,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-14T02:31:24.538Z"
  },
  {
    "id": "r147",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 34.3479,
    "lon": 74.8798,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-27T12:17:24.538Z"
  },
  {
    "id": "r148",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "Low",
    "lat": 11.8033,
    "lon": 77.9468,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-13T21:26:24.538Z"
  },
  {
    "id": "r149",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 30.1606,
    "lon": 77.3509,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-30T08:06:24.538Z"
  },
  {
    "id": "r150",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "Low",
    "lat": 25.0033,
    "lon": 75.9478,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-20T14:37:24.538Z"
  },
  {
    "id": "r151",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 18.2377,
    "lon": 79.3253,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-09T00:15:24.538Z"
  },
  {
    "id": "r152",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 19.6579,
    "lon": 75.1404,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-29T14:50:24.538Z"
  },
  {
    "id": "r153",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 31.5166,
    "lon": 74.6033,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-25T16:14:24.538Z"
  },
  {
    "id": "r154",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "High",
    "lat": 23.1542,
    "lon": 80.2386,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-22T06:58:24.538Z"
  },
  {
    "id": "r155",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "Low",
    "lat": 11.8866,
    "lon": 78.3306,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-25T16:49:24.538Z"
  },
  {
    "id": "r156",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "High",
    "lat": 20.1216,
    "lon": 73.6632,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-28T18:39:24.538Z"
  },
  {
    "id": "r157",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 30.386,
    "lon": 75.0736,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-30T16:46:24.538Z"
  },
  {
    "id": "r158",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "High",
    "lat": 20.4739,
    "lon": 85.8297,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-16T22:32:24.538Z"
  },
  {
    "id": "r159",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 29.9448,
    "lon": 74.8846,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-18T18:39:24.538Z"
  },
  {
    "id": "r160",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 25.4218,
    "lon": 75.7853,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-05-02T19:16:24.538Z"
  },
  {
    "id": "r161",
    "disease": "Pokkah Boeng",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 31.7995,
    "lon": 74.7509,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-05-05T06:10:24.538Z"
  },
  {
    "id": "r162",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "High",
    "lat": 15.2525,
    "lon": 73.6351,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-09T14:43:24.538Z"
  },
  {
    "id": "r163",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "High",
    "lat": 29.781,
    "lon": 77.6959,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-09T10:52:24.538Z"
  },
  {
    "id": "r164",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "High",
    "lat": 28.8293,
    "lon": 77.1612,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-04-16T06:38:24.538Z"
  },
  {
    "id": "r165",
    "disease": "Mosaic",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 26.8106,
    "lon": 75.8838,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-12T21:27:24.538Z"
  },
  {
    "id": "r166",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 22.8979,
    "lon": 76.0763,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-16T05:26:24.538Z"
  },
  {
    "id": "r167",
    "disease": "Tungro",
    "crop": "Rice",
    "severity": "High",
    "lat": 12.9004,
    "lon": 80.2225,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-26T01:40:24.538Z"
  },
  {
    "id": "r168",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Low",
    "lat": 15.2921,
    "lon": 73.5389,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-14T10:26:24.538Z"
  },
  {
    "id": "r169",
    "disease": "Septoria Leaf Spot",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 21.2301,
    "lon": 79.1619,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-08T14:04:24.538Z"
  },
  {
    "id": "r170",
    "disease": "Pokkah Boeng",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 16.2599,
    "lon": 80.6123,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-11T13:41:24.538Z"
  },
  {
    "id": "r171",
    "disease": "Smut",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 24.6541,
    "lon": 84.8688,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-27T15:04:24.538Z"
  },
  {
    "id": "r172",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 18.6146,
    "lon": 78.1015,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-23T08:32:24.538Z"
  },
  {
    "id": "r173",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "High",
    "lat": 25.7646,
    "lon": 91.6127,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-26T01:03:24.538Z"
  },
  {
    "id": "r174",
    "disease": "Tungro",
    "crop": "Rice",
    "severity": "Low",
    "lat": 22.4368,
    "lon": 88.4234,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-16T22:18:24.538Z"
  },
  {
    "id": "r175",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 20.2209,
    "lon": 73.7664,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-14T15:28:24.538Z"
  },
  {
    "id": "r176",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "High",
    "lat": 22.3766,
    "lon": 88.3598,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-17T11:38:24.538Z"
  },
  {
    "id": "r177",
    "disease": "Powdery Mildew",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 18.6996,
    "lon": 73.8887,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-05-02T05:39:24.538Z"
  },
  {
    "id": "r178",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "High",
    "lat": 16.416,
    "lon": 80.6372,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-23T04:02:24.538Z"
  },
  {
    "id": "r179",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "High",
    "lat": 25.3514,
    "lon": 85.1729,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-08T05:33:24.538Z"
  },
  {
    "id": "r180",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 33.9849,
    "lon": 74.5804,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-09T02:22:24.538Z"
  },
  {
    "id": "r181",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 31.885,
    "lon": 74.9018,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-29T00:19:24.538Z"
  },
  {
    "id": "r182",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 21.3964,
    "lon": 78.8105,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-30T10:17:24.538Z"
  },
  {
    "id": "r183",
    "disease": "Early Blight",
    "crop": "Tomato",
    "severity": "High",
    "lat": 15.7625,
    "lon": 74.0388,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-23T09:31:24.538Z"
  },
  {
    "id": "r184",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "Low",
    "lat": 10.0068,
    "lon": 77.942,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-30T01:26:24.538Z"
  },
  {
    "id": "r185",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "High",
    "lat": 13.2457,
    "lon": 80.2721,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-30T21:21:24.538Z"
  },
  {
    "id": "r186",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "Low",
    "lat": 20.2516,
    "lon": 73.7824,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-05-02T19:31:24.538Z"
  },
  {
    "id": "r187",
    "disease": "Leaf Rust",
    "crop": "Wheat",
    "severity": "High",
    "lat": 16.6042,
    "lon": 74.2997,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-10T18:39:24.538Z"
  },
  {
    "id": "r188",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "Low",
    "lat": 25.8088,
    "lon": 92.1769,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-14T05:20:24.538Z"
  },
  {
    "id": "r189",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "Low",
    "lat": 25.7358,
    "lon": 91.9188,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-18T22:46:24.538Z"
  },
  {
    "id": "r190",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "Low",
    "lat": 19.1375,
    "lon": 72.811,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-25T23:33:24.538Z"
  },
  {
    "id": "r191",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "High",
    "lat": 26.9675,
    "lon": 88.2917,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-05-03T21:07:24.538Z"
  },
  {
    "id": "r192",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "Low",
    "lat": 26.773,
    "lon": 88.4663,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-16T07:26:24.538Z"
  },
  {
    "id": "r193",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "Low",
    "lat": 27.4559,
    "lon": 78.038,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-17T16:06:24.538Z"
  },
  {
    "id": "r194",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 25.9508,
    "lon": 91.4411,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-18T05:46:24.538Z"
  },
  {
    "id": "r195",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 13.0837,
    "lon": 80.364,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-28T14:44:24.538Z"
  },
  {
    "id": "r196",
    "disease": "Smut",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 9.9086,
    "lon": 76.3139,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-16T11:10:24.538Z"
  },
  {
    "id": "r197",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "High",
    "lat": 24.8077,
    "lon": 85.1665,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-05-04T02:00:24.538Z"
  },
  {
    "id": "r198",
    "disease": "Target Spot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 25.0312,
    "lon": 75.8148,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-30T05:49:24.538Z"
  },
  {
    "id": "r199",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 31.1663,
    "lon": 77.2144,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-30T21:26:24.538Z"
  },
  {
    "id": "r200",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "Low",
    "lat": 22.3402,
    "lon": 88.5584,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-26T21:35:24.539Z"
  },
  {
    "id": "r201",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "Low",
    "lat": 25.401,
    "lon": 85.0778,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-27T05:22:24.539Z"
  },
  {
    "id": "r202",
    "disease": "Fusarium Wilt",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 18.8602,
    "lon": 73.0706,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-22T10:36:24.539Z"
  },
  {
    "id": "r203",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "High",
    "lat": 16.2812,
    "lon": 80.3202,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-16T17:04:24.539Z"
  },
  {
    "id": "r204",
    "disease": "Pokkah Boeng",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 25.7598,
    "lon": 85.2836,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-05-02T13:11:24.539Z"
  },
  {
    "id": "r205",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "Low",
    "lat": 27.0787,
    "lon": 80.915,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-27T13:55:24.539Z"
  },
  {
    "id": "r206",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "High",
    "lat": 20.1961,
    "lon": 73.983,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-09T21:02:24.539Z"
  },
  {
    "id": "r207",
    "disease": "Early Blight",
    "crop": "Potato",
    "severity": "High",
    "lat": 26.8247,
    "lon": 81.2221,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-19T20:53:24.539Z"
  },
  {
    "id": "r208",
    "disease": "Tomato Late Blight",
    "crop": "Tomato",
    "severity": "High",
    "lat": 29.7714,
    "lon": 77.3049,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-22T13:51:24.539Z"
  },
  {
    "id": "r209",
    "disease": "Grassy Shoot",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 11.4321,
    "lon": 78.0988,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-23T08:40:24.539Z"
  },
  {
    "id": "r210",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 20.2233,
    "lon": 74.013,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-06T02:07:24.539Z"
  },
  {
    "id": "r211",
    "disease": "Target Spot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 19.8365,
    "lon": 73.9835,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-05-01T18:45:24.539Z"
  },
  {
    "id": "r212",
    "disease": "Gray Leaf Spot",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 23.2538,
    "lon": 80.2385,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-16T18:46:24.539Z"
  },
  {
    "id": "r213",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "Low",
    "lat": 11.4328,
    "lon": 77.9369,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-17T05:42:24.539Z"
  },
  {
    "id": "r214",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "High",
    "lat": 12.862,
    "lon": 77.8223,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-06T01:14:24.539Z"
  },
  {
    "id": "r215",
    "disease": "Smut",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 20.1197,
    "lon": 75.1826,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-10T13:10:24.539Z"
  },
  {
    "id": "r216",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "High",
    "lat": 12.0455,
    "lon": 76.7918,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-07T02:05:24.539Z"
  },
  {
    "id": "r217",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "High",
    "lat": 17.3731,
    "lon": 76.0733,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-12T04:30:24.539Z"
  },
  {
    "id": "r218",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "High",
    "lat": 23.4657,
    "lon": 79.7235,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-20T19:18:24.539Z"
  },
  {
    "id": "r219",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "High",
    "lat": 19.8657,
    "lon": 75.3028,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-29T14:03:24.539Z"
  },
  {
    "id": "r220",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Low",
    "lat": 23.1618,
    "lon": 80.2676,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-25T01:49:24.539Z"
  },
  {
    "id": "r221",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 10.7702,
    "lon": 78.7663,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-14T05:17:24.539Z"
  },
  {
    "id": "r222",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "High",
    "lat": 27.1212,
    "lon": 75.498,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-14T15:22:24.539Z"
  },
  {
    "id": "r223",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 33.954,
    "lon": 74.5903,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-20T23:02:24.539Z"
  },
  {
    "id": "r224",
    "disease": "Smut",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 19.6421,
    "lon": 75.209,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-30T11:48:24.539Z"
  },
  {
    "id": "r225",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Low",
    "lat": 25.3236,
    "lon": 75.7483,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-08T22:50:24.539Z"
  },
  {
    "id": "r226",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "Low",
    "lat": 27.087,
    "lon": 75.8988,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-20T16:08:24.539Z"
  },
  {
    "id": "r227",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "Low",
    "lat": 24.7418,
    "lon": 73.888,
    "city": "Udaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-28T17:24:24.539Z"
  },
  {
    "id": "r228",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 19.8454,
    "lon": 75.2397,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-27T05:46:24.539Z"
  },
  {
    "id": "r229",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "High",
    "lat": 26.6468,
    "lon": 88.4828,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-30T03:39:24.539Z"
  },
  {
    "id": "r230",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 16.5327,
    "lon": 73.9623,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-28T05:08:24.539Z"
  },
  {
    "id": "r231",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "Low",
    "lat": 27.0142,
    "lon": 83.4052,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-17T00:52:24.539Z"
  },
  {
    "id": "r232",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "High",
    "lat": 11.7269,
    "lon": 77.9723,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-21T13:03:24.539Z"
  },
  {
    "id": "r233",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 26.5617,
    "lon": 83.5307,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-03T09:18:24.539Z"
  },
  {
    "id": "r234",
    "disease": "Early Blight",
    "crop": "Potato",
    "severity": "Low",
    "lat": 17.7187,
    "lon": 79.5412,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-22T03:34:24.539Z"
  },
  {
    "id": "r235",
    "disease": "Common Rust",
    "crop": "Maize",
    "severity": "Low",
    "lat": 18.5198,
    "lon": 73.618,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-05-03T08:50:24.539Z"
  },
  {
    "id": "r236",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "High",
    "lat": 17.767,
    "lon": 75.8838,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-05-04T13:08:24.539Z"
  },
  {
    "id": "r237",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 13.0462,
    "lon": 77.8541,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-07T03:29:24.539Z"
  },
  {
    "id": "r238",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Low",
    "lat": 26.4666,
    "lon": 88.4614,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-12T15:11:24.539Z"
  },
  {
    "id": "r239",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 28.8921,
    "lon": 76.4484,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-05-04T18:34:24.539Z"
  },
  {
    "id": "r240",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 18.442,
    "lon": 73.5855,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-07T02:13:24.539Z"
  },
  {
    "id": "r241",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "High",
    "lat": 20.1128,
    "lon": 75.5976,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-05-03T11:05:24.539Z"
  },
  {
    "id": "r242",
    "disease": "Septoria Leaf Spot",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 22.7526,
    "lon": 76.0372,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-17T10:33:24.539Z"
  },
  {
    "id": "r243",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "High",
    "lat": 30.0892,
    "lon": 77.3991,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-03T05:59:24.539Z"
  },
  {
    "id": "r244",
    "disease": "Smut",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 18.9598,
    "lon": 77.9039,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-10T19:39:24.539Z"
  },
  {
    "id": "r245",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "Low",
    "lat": 28.1746,
    "lon": 73.5307,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-14T07:49:24.539Z"
  },
  {
    "id": "r246",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "High",
    "lat": 25.6615,
    "lon": 91.9467,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-05-02T13:06:24.539Z"
  },
  {
    "id": "r247",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "High",
    "lat": 12.0493,
    "lon": 76.5582,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-28T11:14:24.539Z"
  },
  {
    "id": "r248",
    "disease": "Septoria Leaf Spot",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 16.7911,
    "lon": 74.4285,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-07T17:15:24.539Z"
  },
  {
    "id": "r249",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 19.2381,
    "lon": 72.7182,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-29T21:38:24.539Z"
  },
  {
    "id": "r250",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 23.2215,
    "lon": 76.0322,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-06T03:06:24.539Z"
  },
  {
    "id": "r251",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 17.6057,
    "lon": 75.6551,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-11T20:13:24.539Z"
  },
  {
    "id": "r252",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Low",
    "lat": 20.0966,
    "lon": 85.5259,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-05-03T19:29:24.539Z"
  },
  {
    "id": "r253",
    "disease": "Karnal Bunt",
    "crop": "Wheat",
    "severity": "High",
    "lat": 26.9982,
    "lon": 75.605,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-28T20:26:24.539Z"
  },
  {
    "id": "r254",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 28.8372,
    "lon": 77.2441,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-04-22T15:05:24.539Z"
  },
  {
    "id": "r255",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Low",
    "lat": 20.2414,
    "lon": 73.9438,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-17T19:55:24.539Z"
  },
  {
    "id": "r256",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 18.9649,
    "lon": 72.964,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-12T19:17:24.539Z"
  },
  {
    "id": "r257",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 23.822,
    "lon": 87.0144,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-05-03T17:15:24.539Z"
  },
  {
    "id": "r258",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 23.0107,
    "lon": 75.9182,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-02T02:41:24.539Z"
  },
  {
    "id": "r259",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 28.6684,
    "lon": 77.2586,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-04-29T01:59:24.539Z"
  },
  {
    "id": "r260",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 20.1661,
    "lon": 85.6327,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-24T02:45:24.539Z"
  },
  {
    "id": "r261",
    "disease": "Tungro",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 10.1856,
    "lon": 78.3573,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-26T18:12:24.539Z"
  },
  {
    "id": "r262",
    "disease": "Bacterial Blight",
    "crop": "Rice",
    "severity": "High",
    "lat": 25.8187,
    "lon": 92.1152,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-25T13:27:24.539Z"
  },
  {
    "id": "r263",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "High",
    "lat": 31.3922,
    "lon": 74.668,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-21T06:19:24.539Z"
  },
  {
    "id": "r264",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "High",
    "lat": 22.4706,
    "lon": 88.265,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-06T15:31:24.539Z"
  },
  {
    "id": "r265",
    "disease": "Sheath Blight",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 26.5179,
    "lon": 88.4174,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-05-02T04:07:24.539Z"
  },
  {
    "id": "r266",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 23.1103,
    "lon": 80.2588,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-05T19:17:24.539Z"
  },
  {
    "id": "r267",
    "disease": "Gray Leaf Spot",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 26.7423,
    "lon": 83.3399,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-25T07:50:24.539Z"
  },
  {
    "id": "r268",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "High",
    "lat": 17.1457,
    "lon": 78.3609,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-10T18:02:24.539Z"
  },
  {
    "id": "r269",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 25.5008,
    "lon": 85.2779,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-25T00:02:24.539Z"
  },
  {
    "id": "r270",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "High",
    "lat": 15.4382,
    "lon": 73.8204,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-10T01:31:24.539Z"
  },
  {
    "id": "r271",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 23.6701,
    "lon": 87.175,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-19T01:59:24.539Z"
  },
  {
    "id": "r272",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 25.4418,
    "lon": 85.3845,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-28T19:53:24.539Z"
  },
  {
    "id": "r273",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 13.307,
    "lon": 80.3736,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-15T12:00:24.539Z"
  },
  {
    "id": "r274",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 18.537,
    "lon": 73.7934,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-08T00:43:24.539Z"
  },
  {
    "id": "r275",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "High",
    "lat": 23.7827,
    "lon": 86.8697,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-05-04T19:19:24.539Z"
  },
  {
    "id": "r276",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 27.1414,
    "lon": 78.0069,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-24T10:36:24.539Z"
  },
  {
    "id": "r277",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 19.904,
    "lon": 75.1824,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-07T17:41:24.539Z"
  },
  {
    "id": "r278",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "High",
    "lat": 27.7905,
    "lon": 73.5566,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-05-04T13:10:24.539Z"
  },
  {
    "id": "r279",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "High",
    "lat": 26.7657,
    "lon": 88.3399,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-30T17:26:24.539Z"
  },
  {
    "id": "r280",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "High",
    "lat": 27.0845,
    "lon": 75.8323,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-11T20:21:24.539Z"
  },
  {
    "id": "r281",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 17.4216,
    "lon": 75.7659,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-23T03:53:24.539Z"
  },
  {
    "id": "r282",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "Low",
    "lat": 23.3903,
    "lon": 75.6349,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-03T12:35:24.539Z"
  },
  {
    "id": "r283",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 19.977,
    "lon": 75.118,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-27T00:44:24.539Z"
  },
  {
    "id": "r284",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "High",
    "lat": 17.6513,
    "lon": 78.7111,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-20T21:42:24.539Z"
  },
  {
    "id": "r285",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 33.8792,
    "lon": 75.042,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-05-05T16:09:24.539Z"
  },
  {
    "id": "r286",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 25.9372,
    "lon": 78.217,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-13T23:51:24.539Z"
  },
  {
    "id": "r287",
    "disease": "Boll Rot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 12.2849,
    "lon": 76.7869,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-16T20:37:24.539Z"
  },
  {
    "id": "r288",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 34.2765,
    "lon": 74.8177,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-13T12:42:24.539Z"
  },
  {
    "id": "r289",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "High",
    "lat": 20.0729,
    "lon": 75.5346,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-21T08:00:24.539Z"
  },
  {
    "id": "r290",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "High",
    "lat": 18.5599,
    "lon": 74.1242,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-24T19:11:24.539Z"
  },
  {
    "id": "r291",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "High",
    "lat": 17.3265,
    "lon": 78.5561,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-05-01T05:33:24.539Z"
  },
  {
    "id": "r292",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 25.6341,
    "lon": 91.6251,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-17T09:55:24.539Z"
  },
  {
    "id": "r293",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 27.3088,
    "lon": 77.7985,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-26T12:50:24.539Z"
  },
  {
    "id": "r294",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 26.5574,
    "lon": 83.2218,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-18T22:34:24.539Z"
  },
  {
    "id": "r295",
    "disease": "Mosaic",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 20.1397,
    "lon": 73.9149,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-15T09:42:24.539Z"
  },
  {
    "id": "r296",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Low",
    "lat": 26.6828,
    "lon": 81.1101,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-09T01:29:24.539Z"
  },
  {
    "id": "r297",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "High",
    "lat": 26.5025,
    "lon": 83.467,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-26T22:27:24.539Z"
  },
  {
    "id": "r298",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "High",
    "lat": 16.5428,
    "lon": 74.3091,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-25T09:13:24.539Z"
  },
  {
    "id": "r299",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "High",
    "lat": 17.3628,
    "lon": 76.1756,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-05-04T05:01:24.539Z"
  },
  {
    "id": "r300",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Low",
    "lat": 30.8645,
    "lon": 75.6114,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-10T02:03:24.539Z"
  },
  {
    "id": "r301",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "High",
    "lat": 22.4699,
    "lon": 75.9786,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-14T11:14:24.539Z"
  },
  {
    "id": "r302",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 16.0695,
    "lon": 80.6092,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-11T17:47:24.539Z"
  },
  {
    "id": "r303",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 26.3061,
    "lon": 77.9791,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-18T09:21:24.539Z"
  },
  {
    "id": "r304",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 30.1359,
    "lon": 77.8042,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-26T19:48:24.539Z"
  },
  {
    "id": "r305",
    "disease": "Karnal Bunt",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 24.9453,
    "lon": 84.9565,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-17T14:08:24.539Z"
  },
  {
    "id": "r306",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "High",
    "lat": 34.1258,
    "lon": 75.0416,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-24T04:49:24.539Z"
  },
  {
    "id": "r307",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 16.5494,
    "lon": 73.9679,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-05-03T03:38:24.539Z"
  },
  {
    "id": "r308",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "Low",
    "lat": 19.0592,
    "lon": 72.7605,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-19T01:54:24.539Z"
  },
  {
    "id": "r309",
    "disease": "Cercospora Leaf Spot",
    "crop": "Banana",
    "severity": "High",
    "lat": 15.3372,
    "lon": 73.6637,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-14T11:08:24.539Z"
  },
  {
    "id": "r310",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 32.7217,
    "lon": 74.7691,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-04-14T14:01:24.539Z"
  },
  {
    "id": "r311",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 23.3109,
    "lon": 72.3047,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-18T18:14:24.539Z"
  },
  {
    "id": "r312",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "High",
    "lat": 13.1861,
    "lon": 77.5791,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-07T16:21:24.539Z"
  },
  {
    "id": "r313",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "Low",
    "lat": 22.6188,
    "lon": 75.6176,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-21T13:20:24.539Z"
  },
  {
    "id": "r314",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 28.043,
    "lon": 73.4175,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-29T05:07:24.539Z"
  },
  {
    "id": "r315",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "Low",
    "lat": 15.6765,
    "lon": 74.0999,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-12T18:04:24.539Z"
  },
  {
    "id": "r316",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "High",
    "lat": 28.7115,
    "lon": 77.1868,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-04-22T03:43:24.539Z"
  },
  {
    "id": "r317",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 24.6612,
    "lon": 73.6488,
    "city": "Udaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-08T20:09:24.539Z"
  },
  {
    "id": "r318",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 20.5325,
    "lon": 85.6361,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-12T16:04:24.539Z"
  },
  {
    "id": "r319",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "High",
    "lat": 29.8418,
    "lon": 77.4353,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-04T19:59:24.539Z"
  },
  {
    "id": "r320",
    "disease": "Powdery Mildew",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 25.807,
    "lon": 85.2931,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-09T09:20:24.539Z"
  },
  {
    "id": "r321",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 10.9311,
    "lon": 78.4845,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-18T16:31:24.539Z"
  },
  {
    "id": "r322",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 30.9487,
    "lon": 77.2191,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-05-05T11:06:24.539Z"
  },
  {
    "id": "r323",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "High",
    "lat": 18.2473,
    "lon": 79.6856,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-11T14:14:24.539Z"
  },
  {
    "id": "r324",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "High",
    "lat": 10.8916,
    "lon": 78.5119,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-11T19:28:24.539Z"
  },
  {
    "id": "r325",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 19.0966,
    "lon": 73.0291,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-05-01T15:05:24.539Z"
  },
  {
    "id": "r326",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "High",
    "lat": 26.7298,
    "lon": 83.3134,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-08T03:45:24.539Z"
  },
  {
    "id": "r327",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "High",
    "lat": 23.4166,
    "lon": 86.9696,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-25T22:57:24.539Z"
  },
  {
    "id": "r328",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "High",
    "lat": 12.8535,
    "lon": 77.4969,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-13T10:43:24.539Z"
  },
  {
    "id": "r329",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 27.1635,
    "lon": 77.8535,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-04T16:55:24.539Z"
  },
  {
    "id": "r330",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 21.3007,
    "lon": 79.2737,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-17T12:02:24.539Z"
  },
  {
    "id": "r331",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "High",
    "lat": 20.8774,
    "lon": 79.3115,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-29T09:49:24.539Z"
  },
  {
    "id": "r332",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 17.9258,
    "lon": 75.966,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-06T09:42:24.539Z"
  },
  {
    "id": "r333",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "Low",
    "lat": 22.8923,
    "lon": 80.2043,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-05T08:23:24.539Z"
  },
  {
    "id": "r334",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 22.8288,
    "lon": 88.2274,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-28T19:15:24.539Z"
  },
  {
    "id": "r335",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "High",
    "lat": 22.4202,
    "lon": 88.199,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-13T16:58:24.539Z"
  },
  {
    "id": "r336",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 31.5809,
    "lon": 74.6123,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-28T15:40:24.539Z"
  },
  {
    "id": "r337",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Low",
    "lat": 22.5304,
    "lon": 76.153,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-21T09:45:24.539Z"
  },
  {
    "id": "r338",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "Low",
    "lat": 9.8234,
    "lon": 76.1461,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-20T02:04:24.539Z"
  },
  {
    "id": "r339",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 31.809,
    "lon": 74.9642,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-28T07:38:24.539Z"
  },
  {
    "id": "r340",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 26.8146,
    "lon": 83.1458,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-02T12:42:24.539Z"
  },
  {
    "id": "r341",
    "disease": "Mosaic",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 26.9817,
    "lon": 75.6866,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-10T02:47:24.539Z"
  },
  {
    "id": "r342",
    "disease": "Fusarium Head Blight",
    "crop": "Wheat",
    "severity": "High",
    "lat": 26.6457,
    "lon": 81.1906,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-19T21:07:24.539Z"
  },
  {
    "id": "r343",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "High",
    "lat": 17.6725,
    "lon": 78.5071,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-09T07:52:24.539Z"
  },
  {
    "id": "r344",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "Low",
    "lat": 20.0388,
    "lon": 73.9287,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-15T12:20:24.539Z"
  },
  {
    "id": "r345",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 20.2929,
    "lon": 73.5361,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-08T08:52:24.539Z"
  },
  {
    "id": "r346",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 10.0101,
    "lon": 76.4784,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-23T14:34:24.539Z"
  },
  {
    "id": "r347",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 20.5781,
    "lon": 86.1108,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-10T19:36:24.539Z"
  },
  {
    "id": "r348",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 27.0328,
    "lon": 83.5026,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-19T17:49:24.539Z"
  },
  {
    "id": "r349",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 25.5388,
    "lon": 84.8694,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-14T22:04:24.539Z"
  },
  {
    "id": "r350",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 10.8813,
    "lon": 78.5729,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-15T16:05:24.539Z"
  },
  {
    "id": "r351",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 17.2585,
    "lon": 78.4885,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-16T08:51:24.539Z"
  },
  {
    "id": "r352",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "Low",
    "lat": 19.0264,
    "lon": 72.7923,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-16T03:58:24.539Z"
  },
  {
    "id": "r353",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "Low",
    "lat": 28.242,
    "lon": 73.446,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-25T12:53:24.539Z"
  },
  {
    "id": "r354",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "High",
    "lat": 26.7315,
    "lon": 88.2318,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-05-01T17:52:24.539Z"
  },
  {
    "id": "r355",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "Low",
    "lat": 30.9236,
    "lon": 76.0145,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-29T11:32:24.539Z"
  },
  {
    "id": "r356",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "High",
    "lat": 31.13,
    "lon": 75.8144,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-15T02:43:24.539Z"
  },
  {
    "id": "r357",
    "disease": "Tungro",
    "crop": "Rice",
    "severity": "High",
    "lat": 18.3941,
    "lon": 73.9431,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-07T13:21:24.539Z"
  },
  {
    "id": "r358",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Low",
    "lat": 23.6913,
    "lon": 86.6563,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-05-02T13:05:24.539Z"
  },
  {
    "id": "r359",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 12.8453,
    "lon": 80.203,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-24T03:06:24.539Z"
  },
  {
    "id": "r360",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 22.8894,
    "lon": 72.2973,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-13T08:28:24.539Z"
  },
  {
    "id": "r361",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "High",
    "lat": 23.1903,
    "lon": 72.6506,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-13T12:10:24.539Z"
  },
  {
    "id": "r362",
    "disease": "Black Spot",
    "crop": "Citrus",
    "severity": "High",
    "lat": 13.0746,
    "lon": 74.8072,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-12T05:16:24.539Z"
  },
  {
    "id": "r363",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 25.47,
    "lon": 75.6449,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-17T06:19:24.539Z"
  },
  {
    "id": "r364",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "Low",
    "lat": 32.545,
    "lon": 74.6984,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-04-10T09:44:24.539Z"
  },
  {
    "id": "r365",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "High",
    "lat": 20.0574,
    "lon": 73.5207,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-11T19:45:24.539Z"
  },
  {
    "id": "r366",
    "disease": "Mosaic",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 19.5984,
    "lon": 75.2492,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-05-04T19:42:24.539Z"
  },
  {
    "id": "r367",
    "disease": "Tomato Leaf Curl",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 12.0719,
    "lon": 76.4131,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-22T09:25:24.539Z"
  },
  {
    "id": "r368",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "High",
    "lat": 28.2133,
    "lon": 73.025,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-17T21:33:24.539Z"
  },
  {
    "id": "r369",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "Low",
    "lat": 24.6049,
    "lon": 85.2456,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-26T01:30:24.539Z"
  },
  {
    "id": "r370",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 25.8463,
    "lon": 84.9779,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-12T00:13:24.539Z"
  },
  {
    "id": "r371",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 31.5419,
    "lon": 75.0328,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-07T14:35:24.539Z"
  },
  {
    "id": "r372",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "Low",
    "lat": 24.756,
    "lon": 73.6096,
    "city": "Udaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-26T20:30:24.539Z"
  },
  {
    "id": "r373",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "Low",
    "lat": 34.262,
    "lon": 74.778,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-05-01T06:54:24.539Z"
  },
  {
    "id": "r374",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 13.0585,
    "lon": 80.0329,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-27T22:57:24.539Z"
  },
  {
    "id": "r375",
    "disease": "Tomato Leaf Curl",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 23.2246,
    "lon": 75.734,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-15T23:24:24.539Z"
  },
  {
    "id": "r376",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 9.8606,
    "lon": 76.3719,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-21T17:06:24.539Z"
  },
  {
    "id": "r377",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 26.9468,
    "lon": 88.5227,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-10T17:41:24.539Z"
  },
  {
    "id": "r378",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Low",
    "lat": 19.8603,
    "lon": 75.1801,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-25T16:52:24.539Z"
  },
  {
    "id": "r379",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Low",
    "lat": 19.0464,
    "lon": 72.7386,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-29T10:45:24.539Z"
  },
  {
    "id": "r380",
    "disease": "Tungro",
    "crop": "Rice",
    "severity": "Low",
    "lat": 25.9324,
    "lon": 91.5379,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-24T07:18:24.539Z"
  },
  {
    "id": "r381",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 11.5274,
    "lon": 77.8946,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-16T03:15:24.539Z"
  },
  {
    "id": "r382",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "Low",
    "lat": 18.4245,
    "lon": 77.8715,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-30T03:43:24.539Z"
  },
  {
    "id": "r383",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "Low",
    "lat": 15.4894,
    "lon": 73.7523,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-22T15:24:24.539Z"
  },
  {
    "id": "r384",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 22.7871,
    "lon": 76.0839,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-20T00:32:24.539Z"
  },
  {
    "id": "r385",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Low",
    "lat": 21.1722,
    "lon": 79.2458,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-05-01T15:10:24.539Z"
  },
  {
    "id": "r386",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 27.2105,
    "lon": 75.77,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-19T07:37:24.539Z"
  },
  {
    "id": "r387",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "Low",
    "lat": 22.6782,
    "lon": 88.571,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-05-02T14:49:24.539Z"
  },
  {
    "id": "r388",
    "disease": "Early Blight",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 12.789,
    "lon": 80.3575,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-12T15:11:24.539Z"
  },
  {
    "id": "r389",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "Low",
    "lat": 30.0739,
    "lon": 78.0762,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-30T18:54:24.539Z"
  },
  {
    "id": "r390",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "High",
    "lat": 31.4425,
    "lon": 74.7407,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-05-04T23:12:24.539Z"
  },
  {
    "id": "r391",
    "disease": "Early Blight",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 16.8942,
    "lon": 74.1457,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-12T19:03:24.539Z"
  },
  {
    "id": "r392",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Low",
    "lat": 29.1131,
    "lon": 76.3669,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-05T22:44:24.539Z"
  },
  {
    "id": "r393",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Low",
    "lat": 24.6514,
    "lon": 73.5505,
    "city": "Udaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-21T22:07:24.539Z"
  },
  {
    "id": "r394",
    "disease": "Black Spot",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 25.0041,
    "lon": 76.1224,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-08T10:03:24.539Z"
  },
  {
    "id": "r395",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 15.5605,
    "lon": 73.6903,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-21T01:56:24.539Z"
  },
  {
    "id": "r396",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "High",
    "lat": 18.9455,
    "lon": 72.9059,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-27T04:11:24.539Z"
  },
  {
    "id": "r397",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Low",
    "lat": 18.0312,
    "lon": 79.4917,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-06T18:19:24.539Z"
  },
  {
    "id": "r398",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 27.755,
    "lon": 73.2004,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-16T02:20:24.539Z"
  },
  {
    "id": "r399",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 9.8947,
    "lon": 76.1949,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-05-02T17:03:24.539Z"
  },
  {
    "id": "r400",
    "disease": "Gray Leaf Spot",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 18.9608,
    "lon": 77.976,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-06T17:03:24.539Z"
  },
  {
    "id": "r401",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "High",
    "lat": 20.0412,
    "lon": 73.6141,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-22T15:05:24.539Z"
  },
  {
    "id": "r402",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 19.6286,
    "lon": 75.5527,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-05-05T10:01:24.539Z"
  },
  {
    "id": "r403",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "Low",
    "lat": 16.3222,
    "lon": 80.4515,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-05-05T02:24:24.539Z"
  },
  {
    "id": "r404",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "High",
    "lat": 9.661,
    "lon": 78.2466,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-19T12:47:24.539Z"
  },
  {
    "id": "r405",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 13.0467,
    "lon": 75.0681,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-30T10:55:24.539Z"
  },
  {
    "id": "r406",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "High",
    "lat": 31.0431,
    "lon": 77.1165,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-28T17:55:24.539Z"
  },
  {
    "id": "r407",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "High",
    "lat": 16.2855,
    "lon": 80.4298,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-05-03T23:43:24.539Z"
  },
  {
    "id": "r408",
    "disease": "Gray Leaf Spot",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 30.7599,
    "lon": 76.0514,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-30T18:39:24.539Z"
  },
  {
    "id": "r409",
    "disease": "Fusarium Wilt",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 9.7127,
    "lon": 76.0512,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-22T17:49:24.539Z"
  },
  {
    "id": "r410",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 17.5763,
    "lon": 78.7148,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-13T15:28:24.539Z"
  },
  {
    "id": "r411",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "High",
    "lat": 15.5216,
    "lon": 73.7869,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-13T10:23:24.539Z"
  },
  {
    "id": "r412",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Low",
    "lat": 13.3624,
    "lon": 80.0458,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-27T11:31:24.539Z"
  },
  {
    "id": "r413",
    "disease": "Tomato Late Blight",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 12.4548,
    "lon": 76.3971,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-05T21:28:24.539Z"
  },
  {
    "id": "r414",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "Low",
    "lat": 25.8364,
    "lon": 91.7878,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-05-02T15:26:24.539Z"
  },
  {
    "id": "r415",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 26.739,
    "lon": 88.48,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-09T01:38:24.539Z"
  },
  {
    "id": "r416",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 23.4264,
    "lon": 86.6959,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-05-05T06:16:24.539Z"
  },
  {
    "id": "r417",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 13.1937,
    "lon": 80.2059,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-05-03T16:04:24.539Z"
  },
  {
    "id": "r418",
    "disease": "Powdery Mildew",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 32.6893,
    "lon": 75.0183,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-04-18T05:06:24.539Z"
  },
  {
    "id": "r419",
    "disease": "Leaf Rust",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 23.1722,
    "lon": 72.6167,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-05-03T05:23:24.539Z"
  },
  {
    "id": "r420",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "High",
    "lat": 26.6247,
    "lon": 88.1098,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-20T16:23:24.539Z"
  },
  {
    "id": "r421",
    "disease": "Karnal Bunt",
    "crop": "Wheat",
    "severity": "High",
    "lat": 12.349,
    "lon": 76.5643,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-18T09:40:24.539Z"
  },
  {
    "id": "r422",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "High",
    "lat": 10.1367,
    "lon": 76.5393,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-05-01T20:36:24.539Z"
  },
  {
    "id": "r423",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 12.9087,
    "lon": 74.6777,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-14T18:42:24.539Z"
  },
  {
    "id": "r424",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Low",
    "lat": 26.5797,
    "lon": 80.9629,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-03T05:24:24.539Z"
  },
  {
    "id": "r425",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "High",
    "lat": 23.0162,
    "lon": 75.574,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-08T02:00:24.539Z"
  },
  {
    "id": "r426",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 22.9381,
    "lon": 75.9241,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-04T14:13:24.539Z"
  },
  {
    "id": "r427",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 22.2764,
    "lon": 88.3121,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-16T10:17:24.539Z"
  },
  {
    "id": "r428",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 12.6407,
    "lon": 74.8685,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-28T07:21:24.539Z"
  },
  {
    "id": "r429",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 26.5878,
    "lon": 81.2085,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-26T13:18:24.539Z"
  },
  {
    "id": "r430",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "Low",
    "lat": 26.4369,
    "lon": 78.3849,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-28T02:54:24.539Z"
  },
  {
    "id": "r431",
    "disease": "Black Spot",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 20.1302,
    "lon": 73.8719,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-13T18:04:24.539Z"
  },
  {
    "id": "r432",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 21.1101,
    "lon": 79.3258,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-14T17:28:24.539Z"
  },
  {
    "id": "r433",
    "disease": "Septoria Leaf Spot",
    "crop": "Tomato",
    "severity": "High",
    "lat": 29.0867,
    "lon": 76.5382,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-21T00:19:24.539Z"
  },
  {
    "id": "r434",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 22.8434,
    "lon": 72.3082,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-25T12:24:24.539Z"
  },
  {
    "id": "r435",
    "disease": "Tungro",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 17.4178,
    "lon": 78.3662,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-07T11:15:24.539Z"
  },
  {
    "id": "r436",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 17.1812,
    "lon": 78.4685,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-06T22:35:24.539Z"
  },
  {
    "id": "r437",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 31.1184,
    "lon": 77.0856,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-29T01:09:24.539Z"
  },
  {
    "id": "r438",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 25.8257,
    "lon": 91.9895,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-13T00:34:24.539Z"
  },
  {
    "id": "r439",
    "disease": "Boll Rot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 31.1352,
    "lon": 77.0102,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-05-03T22:23:24.539Z"
  },
  {
    "id": "r440",
    "disease": "Cercospora Leaf Spot",
    "crop": "Banana",
    "severity": "High",
    "lat": 25.4297,
    "lon": 75.9105,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-25T21:04:24.539Z"
  },
  {
    "id": "r441",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Low",
    "lat": 26.6978,
    "lon": 75.8381,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-09T20:22:24.539Z"
  },
  {
    "id": "r442",
    "disease": "Leaf Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 22.7005,
    "lon": 88.4099,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-05-04T09:56:24.539Z"
  },
  {
    "id": "r443",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "High",
    "lat": 12.6876,
    "lon": 77.6453,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-11T16:20:24.539Z"
  },
  {
    "id": "r444",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "High",
    "lat": 21.0009,
    "lon": 79.1987,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-05-01T08:34:24.539Z"
  },
  {
    "id": "r445",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "High",
    "lat": 24.9594,
    "lon": 85.205,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-14T13:08:24.539Z"
  },
  {
    "id": "r446",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 25.9804,
    "lon": 78.2398,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-10T21:16:24.539Z"
  },
  {
    "id": "r447",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 26.2766,
    "lon": 78.176,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-27T00:03:24.539Z"
  },
  {
    "id": "r448",
    "disease": "Septoria Leaf Spot",
    "crop": "Tomato",
    "severity": "High",
    "lat": 33.8024,
    "lon": 74.9293,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-24T10:57:24.539Z"
  },
  {
    "id": "r449",
    "disease": "Bacterial Blight",
    "crop": "Rice",
    "severity": "High",
    "lat": 30.981,
    "lon": 76.9083,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-26T22:24:24.539Z"
  },
  {
    "id": "r450",
    "disease": "Early Blight",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 12.9101,
    "lon": 77.7827,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-28T19:36:24.539Z"
  },
  {
    "id": "r451",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 23.2178,
    "lon": 72.7941,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-06T06:08:24.539Z"
  },
  {
    "id": "r452",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 28.5182,
    "lon": 76.8603,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-04-29T06:48:24.539Z"
  },
  {
    "id": "r453",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "High",
    "lat": 25.6918,
    "lon": 91.8237,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-14T19:07:24.539Z"
  },
  {
    "id": "r454",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "High",
    "lat": 13.0513,
    "lon": 75.0798,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-16T23:10:24.539Z"
  },
  {
    "id": "r455",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 26.97,
    "lon": 83.1165,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-24T13:38:24.539Z"
  },
  {
    "id": "r456",
    "disease": "Leaf Rust",
    "crop": "Wheat",
    "severity": "High",
    "lat": 32.9288,
    "lon": 75.057,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-04-14T06:07:24.539Z"
  },
  {
    "id": "r457",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 24.4999,
    "lon": 84.9334,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-24T01:37:24.539Z"
  },
  {
    "id": "r458",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 25.7533,
    "lon": 85.03,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-06T14:11:24.539Z"
  },
  {
    "id": "r459",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Low",
    "lat": 25.1489,
    "lon": 75.9868,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-20T00:40:24.539Z"
  },
  {
    "id": "r460",
    "disease": "Fusarium Wilt",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 28.516,
    "lon": 77.0797,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-04-23T06:18:24.539Z"
  },
  {
    "id": "r461",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 12.8655,
    "lon": 77.6283,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-29T07:04:24.539Z"
  },
  {
    "id": "r462",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 16.9644,
    "lon": 74.0023,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-10T09:55:24.539Z"
  },
  {
    "id": "r463",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "Low",
    "lat": 17.7702,
    "lon": 79.3638,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-22T05:15:24.539Z"
  },
  {
    "id": "r464",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "High",
    "lat": 30.2621,
    "lon": 75.1425,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-30T21:31:24.539Z"
  },
  {
    "id": "r465",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 11.4353,
    "lon": 77.8686,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-25T17:14:24.539Z"
  },
  {
    "id": "r466",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "High",
    "lat": 27.1205,
    "lon": 75.9383,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-22T06:16:24.539Z"
  },
  {
    "id": "r467",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "High",
    "lat": 34.3806,
    "lon": 74.8111,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-27T15:53:24.539Z"
  },
  {
    "id": "r468",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "Low",
    "lat": 13.1477,
    "lon": 80.5678,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-17T01:20:24.539Z"
  },
  {
    "id": "r469",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 12.7625,
    "lon": 77.4097,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-18T13:37:24.539Z"
  },
  {
    "id": "r470",
    "disease": "Common Rust",
    "crop": "Maize",
    "severity": "High",
    "lat": 23.5585,
    "lon": 86.6796,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-07T03:34:24.539Z"
  },
  {
    "id": "r471",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 18.1779,
    "lon": 79.5124,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-28T08:32:24.539Z"
  },
  {
    "id": "r472",
    "disease": "Common Rust",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 22.9468,
    "lon": 75.5443,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-11T20:59:24.539Z"
  },
  {
    "id": "r473",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "High",
    "lat": 25.5661,
    "lon": 91.9131,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-05-05T13:08:24.539Z"
  },
  {
    "id": "r474",
    "disease": "Fusarium Wilt",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 29.7204,
    "lon": 77.4571,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-16T09:05:24.539Z"
  },
  {
    "id": "r475",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "High",
    "lat": 20.9451,
    "lon": 79.2699,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-25T21:22:24.539Z"
  },
  {
    "id": "r476",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 23.3331,
    "lon": 80.116,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-03T10:54:24.539Z"
  },
  {
    "id": "r477",
    "disease": "Black Spot",
    "crop": "Citrus",
    "severity": "High",
    "lat": 24.6292,
    "lon": 73.8642,
    "city": "Udaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-06T17:48:24.539Z"
  },
  {
    "id": "r478",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "Low",
    "lat": 30.148,
    "lon": 77.5158,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-21T00:57:24.539Z"
  },
  {
    "id": "r479",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 30.1744,
    "lon": 75.2147,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-05T21:01:24.539Z"
  },
  {
    "id": "r480",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "Low",
    "lat": 18.3459,
    "lon": 73.5991,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-05-05T07:59:24.539Z"
  },
  {
    "id": "r481",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "High",
    "lat": 25.9224,
    "lon": 91.5009,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-17T16:51:24.539Z"
  },
  {
    "id": "r482",
    "disease": "Tungro",
    "crop": "Rice",
    "severity": "Low",
    "lat": 28.6392,
    "lon": 76.8335,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-13T03:23:24.539Z"
  },
  {
    "id": "r483",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 31.5439,
    "lon": 74.7827,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-29T19:29:24.539Z"
  },
  {
    "id": "r484",
    "disease": "Target Spot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 20.229,
    "lon": 85.7464,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-26T11:02:24.539Z"
  },
  {
    "id": "r485",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "High",
    "lat": 13.1945,
    "lon": 80.3813,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-30T16:23:24.539Z"
  },
  {
    "id": "r486",
    "disease": "Septoria Leaf Spot",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 28.1811,
    "lon": 73.5859,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-23T02:04:24.539Z"
  },
  {
    "id": "r487",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Low",
    "lat": 18.6066,
    "lon": 78.3778,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-19T03:14:24.539Z"
  },
  {
    "id": "r488",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "High",
    "lat": 30.1955,
    "lon": 77.9072,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-21T16:40:24.539Z"
  },
  {
    "id": "r489",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "High",
    "lat": 28.9156,
    "lon": 76.8561,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-04-08T22:27:24.539Z"
  },
  {
    "id": "r490",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Low",
    "lat": 22.977,
    "lon": 79.9211,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-15T03:04:24.539Z"
  },
  {
    "id": "r491",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 22.9315,
    "lon": 72.7238,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-08T12:14:24.539Z"
  },
  {
    "id": "r492",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "Low",
    "lat": 18.9391,
    "lon": 78.029,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-05-02T17:45:24.539Z"
  },
  {
    "id": "r493",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "High",
    "lat": 12.8959,
    "lon": 74.998,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-07T06:03:24.539Z"
  },
  {
    "id": "r494",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "Low",
    "lat": 16.174,
    "lon": 80.137,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-05-04T17:51:24.539Z"
  },
  {
    "id": "r495",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 24.5128,
    "lon": 84.8517,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-18T06:17:24.539Z"
  },
  {
    "id": "r496",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 10.7361,
    "lon": 78.7552,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-09T06:06:24.539Z"
  },
  {
    "id": "r497",
    "disease": "Cercospora Leaf Spot",
    "crop": "Banana",
    "severity": "High",
    "lat": 12.864,
    "lon": 74.8159,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-21T23:28:24.539Z"
  },
  {
    "id": "r498",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 25.4699,
    "lon": 84.9304,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-24T04:32:24.539Z"
  },
  {
    "id": "r499",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 22.7778,
    "lon": 75.6848,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-06T21:20:24.539Z"
  },
  {
    "id": "r500",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Low",
    "lat": 32.6111,
    "lon": 74.8093,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-05-02T02:55:24.539Z"
  },
  {
    "id": "r501",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 22.9997,
    "lon": 75.6812,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-23T03:20:24.539Z"
  },
  {
    "id": "r502",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "Low",
    "lat": 16.485,
    "lon": 80.3069,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-05-04T22:28:24.539Z"
  },
  {
    "id": "r503",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "High",
    "lat": 26.8796,
    "lon": 77.9226,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-03T01:12:24.539Z"
  },
  {
    "id": "r504",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "High",
    "lat": 25.4982,
    "lon": 85.0388,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-11T23:14:24.539Z"
  },
  {
    "id": "r505",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 12.249,
    "lon": 76.9356,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-05-03T14:51:24.539Z"
  },
  {
    "id": "r506",
    "disease": "Grassy Shoot",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 31.5044,
    "lon": 74.7102,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-14T15:19:24.539Z"
  },
  {
    "id": "r507",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 9.8996,
    "lon": 75.9806,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-05-01T21:02:24.539Z"
  },
  {
    "id": "r508",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "High",
    "lat": 18.5974,
    "lon": 74.0015,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-05-03T07:23:24.539Z"
  },
  {
    "id": "r509",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 23.2966,
    "lon": 72.8199,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-30T02:20:24.539Z"
  },
  {
    "id": "r510",
    "disease": "Sheath Blight",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 30.2994,
    "lon": 78.1457,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-11T07:26:24.539Z"
  },
  {
    "id": "r511",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "Low",
    "lat": 16.6247,
    "lon": 74.4261,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-10T23:27:24.539Z"
  },
  {
    "id": "r512",
    "disease": "Mosaic",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 16.5106,
    "lon": 74.2232,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-05-03T00:49:24.539Z"
  },
  {
    "id": "r513",
    "disease": "Pokkah Boeng",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 30.3385,
    "lon": 77.9729,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-05-01T05:13:24.539Z"
  },
  {
    "id": "r514",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 20.5574,
    "lon": 85.9999,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-05-02T19:47:24.539Z"
  },
  {
    "id": "r515",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 26.0282,
    "lon": 78.0317,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-23T17:07:24.539Z"
  },
  {
    "id": "r516",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 10.548,
    "lon": 78.9046,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-05-04T00:22:24.539Z"
  },
  {
    "id": "r517",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Low",
    "lat": 11.4046,
    "lon": 78.3648,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-30T10:32:24.539Z"
  },
  {
    "id": "r518",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 17.3972,
    "lon": 75.7017,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-17T00:10:24.539Z"
  },
  {
    "id": "r519",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "High",
    "lat": 23.2136,
    "lon": 75.9836,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-23T10:57:24.539Z"
  },
  {
    "id": "r520",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 27.1934,
    "lon": 77.8639,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-04T21:13:24.539Z"
  },
  {
    "id": "r521",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 27.9304,
    "lon": 73.5461,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-13T02:04:24.539Z"
  },
  {
    "id": "r522",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Low",
    "lat": 24.5362,
    "lon": 84.954,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-21T19:48:24.539Z"
  },
  {
    "id": "r523",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 24.7379,
    "lon": 73.5996,
    "city": "Udaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-24T08:59:24.539Z"
  },
  {
    "id": "r524",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "High",
    "lat": 22.8358,
    "lon": 88.5443,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-15T14:49:24.539Z"
  },
  {
    "id": "r525",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 26.0029,
    "lon": 91.9142,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-05-05T05:00:24.539Z"
  },
  {
    "id": "r526",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "High",
    "lat": 27.0643,
    "lon": 81.1969,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-27T06:55:24.539Z"
  },
  {
    "id": "r527",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "Low",
    "lat": 22.9019,
    "lon": 75.6396,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-10T18:28:24.539Z"
  },
  {
    "id": "r528",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "Low",
    "lat": 30.0527,
    "lon": 77.5352,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-17T15:38:24.539Z"
  },
  {
    "id": "r529",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 26.7692,
    "lon": 83.1069,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-05T19:04:24.539Z"
  },
  {
    "id": "r530",
    "disease": "Fusarium Head Blight",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 25.5994,
    "lon": 92.1439,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-29T09:40:24.539Z"
  },
  {
    "id": "r531",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "Low",
    "lat": 10.2114,
    "lon": 76.0818,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-12T02:00:24.539Z"
  },
  {
    "id": "r532",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "Low",
    "lat": 23.8024,
    "lon": 87.2031,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-28T19:18:24.539Z"
  },
  {
    "id": "r533",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 31.0413,
    "lon": 75.8939,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-30T00:39:24.539Z"
  },
  {
    "id": "r534",
    "disease": "Boll Rot",
    "crop": "Cotton",
    "severity": "High",
    "lat": 22.8319,
    "lon": 72.5243,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-09T08:28:24.539Z"
  },
  {
    "id": "r535",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "High",
    "lat": 16.9295,
    "lon": 74.268,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-11T19:06:24.539Z"
  },
  {
    "id": "r536",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Low",
    "lat": 13.2213,
    "lon": 77.806,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-06T12:56:24.539Z"
  },
  {
    "id": "r537",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 24.7338,
    "lon": 84.7254,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-19T15:03:24.539Z"
  },
  {
    "id": "r538",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "High",
    "lat": 9.7533,
    "lon": 76.0288,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-22T04:52:24.539Z"
  },
  {
    "id": "r539",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "High",
    "lat": 10.0968,
    "lon": 76.5178,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-12T10:27:24.539Z"
  },
  {
    "id": "r540",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "High",
    "lat": 20.1959,
    "lon": 74.0004,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-22T05:12:24.539Z"
  },
  {
    "id": "r541",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "Low",
    "lat": 20.501,
    "lon": 86.0514,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-14T15:46:24.539Z"
  },
  {
    "id": "r542",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "High",
    "lat": 13.0507,
    "lon": 80.1131,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-18T20:05:24.539Z"
  },
  {
    "id": "r543",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 15.6376,
    "lon": 74.0946,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-21T20:28:24.539Z"
  },
  {
    "id": "r544",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "High",
    "lat": 22.5258,
    "lon": 75.5791,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-18T17:30:24.539Z"
  },
  {
    "id": "r545",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "High",
    "lat": 31.4585,
    "lon": 74.8561,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-26T14:01:24.539Z"
  },
  {
    "id": "r546",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 11.5729,
    "lon": 78.3394,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-27T19:20:24.539Z"
  },
  {
    "id": "r547",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 26.917,
    "lon": 78.2282,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-09T18:04:24.539Z"
  },
  {
    "id": "r548",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "Low",
    "lat": 10.901,
    "lon": 78.8662,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-12T03:08:24.539Z"
  },
  {
    "id": "r549",
    "disease": "Target Spot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 10.72,
    "lon": 78.5629,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-22T13:55:24.539Z"
  },
  {
    "id": "r550",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 22.4558,
    "lon": 88.1244,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-24T03:22:24.539Z"
  },
  {
    "id": "r551",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 12.8609,
    "lon": 80.2007,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-06T11:10:24.539Z"
  },
  {
    "id": "r552",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 30.8899,
    "lon": 75.7924,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-05-04T08:11:24.539Z"
  },
  {
    "id": "r553",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Low",
    "lat": 19.7699,
    "lon": 73.7291,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-25T13:06:24.539Z"
  },
  {
    "id": "r554",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "High",
    "lat": 21.2751,
    "lon": 78.8468,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-16T18:19:24.539Z"
  },
  {
    "id": "r555",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 27.7419,
    "lon": 73.6022,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-16T08:18:24.539Z"
  },
  {
    "id": "r556",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 11.491,
    "lon": 78.4184,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-17T23:27:24.539Z"
  },
  {
    "id": "r557",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Low",
    "lat": 25.0343,
    "lon": 75.9094,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-27T12:49:24.539Z"
  },
  {
    "id": "r558",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Low",
    "lat": 17.8527,
    "lon": 75.9258,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-22T12:36:24.539Z"
  },
  {
    "id": "r559",
    "disease": "Tomato Leaf Curl",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 29.0587,
    "lon": 76.8883,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-29T19:48:24.539Z"
  },
  {
    "id": "r560",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "High",
    "lat": 16.1115,
    "lon": 80.4004,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-11T14:52:24.539Z"
  },
  {
    "id": "r561",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "Low",
    "lat": 15.5397,
    "lon": 73.7793,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-14T08:34:24.539Z"
  },
  {
    "id": "r562",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 12.942,
    "lon": 77.5759,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-13T00:15:24.539Z"
  },
  {
    "id": "r563",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "High",
    "lat": 34.1515,
    "lon": 74.5893,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-20T15:23:24.539Z"
  },
  {
    "id": "r564",
    "disease": "Target Spot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 26.7807,
    "lon": 76.0249,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-14T13:44:24.539Z"
  },
  {
    "id": "r565",
    "disease": "Gray Leaf Spot",
    "crop": "Maize",
    "severity": "High",
    "lat": 10.0987,
    "lon": 76.3073,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-05-05T18:08:24.539Z"
  },
  {
    "id": "r566",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "High",
    "lat": 25.8169,
    "lon": 85.099,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-21T23:41:24.539Z"
  },
  {
    "id": "r567",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "High",
    "lat": 30.2193,
    "lon": 77.7751,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-12T10:50:24.539Z"
  },
  {
    "id": "r568",
    "disease": "Target Spot",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 31.6549,
    "lon": 74.8478,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-10T00:35:24.539Z"
  },
  {
    "id": "r569",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 23.28,
    "lon": 75.9244,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-10T16:22:24.539Z"
  },
  {
    "id": "r570",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 18.9017,
    "lon": 72.7453,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-05-01T11:26:24.539Z"
  },
  {
    "id": "r571",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 33.929,
    "lon": 74.6412,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-05-01T12:10:24.539Z"
  },
  {
    "id": "r572",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "High",
    "lat": 20.0283,
    "lon": 73.5408,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-27T14:26:24.539Z"
  },
  {
    "id": "r573",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "High",
    "lat": 19.8444,
    "lon": 73.8151,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-26T07:11:24.539Z"
  },
  {
    "id": "r574",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "Low",
    "lat": 23.1457,
    "lon": 79.9245,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-30T06:26:24.539Z"
  },
  {
    "id": "r575",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 18.134,
    "lon": 79.6945,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-24T00:15:24.539Z"
  },
  {
    "id": "r576",
    "disease": "Bacterial Blight",
    "crop": "Rice",
    "severity": "Low",
    "lat": 17.2823,
    "lon": 78.6772,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-29T23:03:24.539Z"
  },
  {
    "id": "r577",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "Low",
    "lat": 30.652,
    "lon": 76.08,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-20T04:33:24.539Z"
  },
  {
    "id": "r578",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "Low",
    "lat": 31.6362,
    "lon": 74.8463,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-05-02T14:19:24.539Z"
  },
  {
    "id": "r579",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "Low",
    "lat": 23.1033,
    "lon": 72.4923,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-19T23:38:24.539Z"
  },
  {
    "id": "r580",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "High",
    "lat": 13.1058,
    "lon": 80.0168,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-29T07:26:24.539Z"
  },
  {
    "id": "r581",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "High",
    "lat": 25.4006,
    "lon": 85.1484,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-15T02:30:24.539Z"
  },
  {
    "id": "r582",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "High",
    "lat": 24.7923,
    "lon": 73.9286,
    "city": "Udaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-13T18:57:24.539Z"
  },
  {
    "id": "r583",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 25.6315,
    "lon": 85.0101,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-26T05:43:24.539Z"
  },
  {
    "id": "r584",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 10.1371,
    "lon": 78.181,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-21T22:16:24.539Z"
  },
  {
    "id": "r585",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 12.1198,
    "lon": 76.7864,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-15T13:24:24.539Z"
  },
  {
    "id": "r586",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 25.4694,
    "lon": 75.8747,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-07T02:57:24.539Z"
  },
  {
    "id": "r587",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 18.2362,
    "lon": 79.8549,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-13T23:11:24.539Z"
  },
  {
    "id": "r588",
    "disease": "Early Blight",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 16.4964,
    "lon": 80.2742,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-05-03T02:37:24.539Z"
  },
  {
    "id": "r589",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 9.6393,
    "lon": 76.2903,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-07T13:40:24.539Z"
  },
  {
    "id": "r590",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "Low",
    "lat": 25.7381,
    "lon": 85.3578,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-05-03T12:51:24.539Z"
  },
  {
    "id": "r591",
    "disease": "Common Rust",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 20.4889,
    "lon": 85.6488,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-09T15:05:24.539Z"
  },
  {
    "id": "r592",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "High",
    "lat": 23.0585,
    "lon": 75.948,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-01T17:43:24.539Z"
  },
  {
    "id": "r593",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 9.7337,
    "lon": 78.1759,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-29T17:42:24.539Z"
  },
  {
    "id": "r594",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 18.3251,
    "lon": 73.7224,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-07T12:01:24.539Z"
  },
  {
    "id": "r595",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 23.0761,
    "lon": 72.6842,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-06T14:50:24.539Z"
  },
  {
    "id": "r596",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "High",
    "lat": 9.6645,
    "lon": 76.4915,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-22T14:30:24.539Z"
  },
  {
    "id": "r597",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "High",
    "lat": 25.7401,
    "lon": 91.8763,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-05-03T23:05:24.539Z"
  },
  {
    "id": "r598",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "High",
    "lat": 16.448,
    "lon": 74.0678,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-13T09:47:24.539Z"
  },
  {
    "id": "r599",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "Low",
    "lat": 17.2838,
    "lon": 78.4056,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-24T06:21:24.539Z"
  },
  {
    "id": "r600",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "High",
    "lat": 31.1916,
    "lon": 76.9949,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-05-04T16:13:24.539Z"
  },
  {
    "id": "r601",
    "disease": "Early Blight",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 18.8997,
    "lon": 78.2183,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-08T01:53:24.539Z"
  },
  {
    "id": "r602",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "High",
    "lat": 22.816,
    "lon": 75.6856,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-25T23:45:24.539Z"
  },
  {
    "id": "r603",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "Low",
    "lat": 12.7353,
    "lon": 75.0816,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-27T16:17:24.539Z"
  },
  {
    "id": "r604",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 30.0383,
    "lon": 78.2463,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-10T15:14:24.539Z"
  },
  {
    "id": "r605",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 23.143,
    "lon": 72.4347,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-10T16:51:24.539Z"
  },
  {
    "id": "r606",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "Low",
    "lat": 12.2705,
    "lon": 76.5397,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-26T00:55:24.539Z"
  },
  {
    "id": "r607",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 10.2047,
    "lon": 78.4136,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-15T16:37:24.539Z"
  },
  {
    "id": "r608",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 20.0985,
    "lon": 73.8512,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-23T06:07:24.539Z"
  },
  {
    "id": "r609",
    "disease": "Fusarium Wilt",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 26.7253,
    "lon": 80.855,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-15T07:25:24.539Z"
  },
  {
    "id": "r610",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 23.2589,
    "lon": 76.0068,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-08T18:45:24.539Z"
  },
  {
    "id": "r611",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "High",
    "lat": 30.4576,
    "lon": 75.2356,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-05-01T00:13:24.539Z"
  },
  {
    "id": "r612",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Low",
    "lat": 27.0028,
    "lon": 83.3777,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-08T21:30:24.539Z"
  },
  {
    "id": "r613",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 30.2834,
    "lon": 78.0279,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-15T03:56:24.539Z"
  },
  {
    "id": "r614",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "High",
    "lat": 30.9491,
    "lon": 77.1442,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-19T13:38:24.539Z"
  },
  {
    "id": "r615",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "High",
    "lat": 12.7721,
    "lon": 74.9969,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-05-03T16:19:24.539Z"
  },
  {
    "id": "r616",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "High",
    "lat": 20.0538,
    "lon": 85.8914,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-09T12:41:24.539Z"
  },
  {
    "id": "r617",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 22.6483,
    "lon": 75.9811,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-11T21:10:24.539Z"
  },
  {
    "id": "r618",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "High",
    "lat": 28.0234,
    "lon": 73.3614,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-20T04:08:24.539Z"
  },
  {
    "id": "r619",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "High",
    "lat": 28.7013,
    "lon": 76.685,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-19T21:58:24.539Z"
  },
  {
    "id": "r620",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 12.993,
    "lon": 77.719,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-23T14:06:24.539Z"
  },
  {
    "id": "r621",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "High",
    "lat": 23.9721,
    "lon": 87.1904,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-17T03:06:24.539Z"
  },
  {
    "id": "r622",
    "disease": "Leaf Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 23.2814,
    "lon": 72.6312,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-05-03T01:29:24.539Z"
  },
  {
    "id": "r623",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 30.306,
    "lon": 74.8926,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-12T00:48:24.539Z"
  },
  {
    "id": "r624",
    "disease": "Fusarium Head Blight",
    "crop": "Wheat",
    "severity": "High",
    "lat": 22.7971,
    "lon": 72.4341,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-22T10:17:24.539Z"
  },
  {
    "id": "r625",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 9.9549,
    "lon": 78.0351,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-14T12:38:24.539Z"
  },
  {
    "id": "r626",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "High",
    "lat": 9.8417,
    "lon": 78.0574,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-07T15:43:24.539Z"
  },
  {
    "id": "r627",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "Low",
    "lat": 30.8111,
    "lon": 77.2482,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-20T03:51:24.539Z"
  },
  {
    "id": "r628",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 23.8115,
    "lon": 86.8315,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-20T09:52:24.539Z"
  },
  {
    "id": "r629",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 9.6521,
    "lon": 76.0556,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-05-01T09:15:24.539Z"
  },
  {
    "id": "r630",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "Low",
    "lat": 12.503,
    "lon": 76.4834,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-21T20:48:24.539Z"
  },
  {
    "id": "r631",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "High",
    "lat": 29.9713,
    "lon": 75.2265,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-19T01:31:24.539Z"
  },
  {
    "id": "r632",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 25.8626,
    "lon": 91.7988,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-14T05:36:24.539Z"
  },
  {
    "id": "r633",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 18.9689,
    "lon": 78.1082,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-26T18:51:24.539Z"
  },
  {
    "id": "r634",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Low",
    "lat": 26.9159,
    "lon": 88.6434,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-14T15:13:24.539Z"
  },
  {
    "id": "r635",
    "disease": "Mosaic",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 17.8984,
    "lon": 79.428,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-22T19:00:24.539Z"
  },
  {
    "id": "r636",
    "disease": "Leaf Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 17.7492,
    "lon": 79.4295,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-05-04T04:52:24.540Z"
  },
  {
    "id": "r637",
    "disease": "Sheath Blight",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 31.8165,
    "lon": 74.823,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-08T23:11:24.540Z"
  },
  {
    "id": "r638",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 22.6428,
    "lon": 88.622,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-16T10:56:24.540Z"
  },
  {
    "id": "r639",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "Low",
    "lat": 33.8454,
    "lon": 74.9221,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-05-03T22:28:24.540Z"
  },
  {
    "id": "r640",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 21.2645,
    "lon": 79.0797,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-25T17:02:24.540Z"
  },
  {
    "id": "r641",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "High",
    "lat": 24.829,
    "lon": 84.7927,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-07T23:52:24.540Z"
  },
  {
    "id": "r642",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Low",
    "lat": 16.6408,
    "lon": 74.2263,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-14T11:34:24.540Z"
  },
  {
    "id": "r643",
    "disease": "Sheath Blight",
    "crop": "Rice",
    "severity": "High",
    "lat": 10.0864,
    "lon": 76.0262,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-24T08:59:24.540Z"
  },
  {
    "id": "r644",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "High",
    "lat": 28.7037,
    "lon": 76.4164,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-23T19:32:24.540Z"
  },
  {
    "id": "r645",
    "disease": "Boll Rot",
    "crop": "Cotton",
    "severity": "High",
    "lat": 27.2075,
    "lon": 77.7138,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-27T07:52:24.540Z"
  },
  {
    "id": "r646",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 26.1737,
    "lon": 91.5219,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-11T12:25:24.540Z"
  },
  {
    "id": "r647",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "High",
    "lat": 25.5555,
    "lon": 91.6503,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-05-01T18:32:24.540Z"
  },
  {
    "id": "r648",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "High",
    "lat": 23.9219,
    "lon": 87.08,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-17T15:34:24.540Z"
  },
  {
    "id": "r649",
    "disease": "Mosaic",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 18.4083,
    "lon": 77.9409,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-11T03:19:24.540Z"
  },
  {
    "id": "r650",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Low",
    "lat": 18.8581,
    "lon": 73.126,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-09T06:59:24.540Z"
  },
  {
    "id": "r651",
    "disease": "Common Rust",
    "crop": "Maize",
    "severity": "Low",
    "lat": 12.8112,
    "lon": 77.3332,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-11T10:22:24.540Z"
  },
  {
    "id": "r652",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Low",
    "lat": 30.0533,
    "lon": 77.4685,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-05T23:05:24.540Z"
  },
  {
    "id": "r653",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 30.9453,
    "lon": 76.9232,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-10T10:29:24.540Z"
  },
  {
    "id": "r654",
    "disease": "Pokkah Boeng",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 20.2769,
    "lon": 85.8011,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-16T11:02:24.540Z"
  },
  {
    "id": "r655",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 18.4017,
    "lon": 73.8867,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-14T17:15:24.540Z"
  },
  {
    "id": "r656",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "High",
    "lat": 23.506,
    "lon": 87.0778,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-21T15:40:24.540Z"
  },
  {
    "id": "r657",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 27.8675,
    "lon": 73.3356,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-10T05:35:24.540Z"
  },
  {
    "id": "r658",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 22.5495,
    "lon": 88.3356,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-20T09:26:24.540Z"
  },
  {
    "id": "r659",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "Low",
    "lat": 30.7937,
    "lon": 75.8184,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-08T20:16:24.540Z"
  },
  {
    "id": "r660",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "High",
    "lat": 30.9515,
    "lon": 75.6002,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-19T00:40:24.540Z"
  },
  {
    "id": "r661",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 26.1129,
    "lon": 78.3686,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-30T18:06:24.540Z"
  },
  {
    "id": "r662",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "High",
    "lat": 21.4359,
    "lon": 79.2986,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-05-04T03:07:24.540Z"
  },
  {
    "id": "r663",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "High",
    "lat": 25.1096,
    "lon": 75.6037,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-14T20:27:24.540Z"
  },
  {
    "id": "r664",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "Low",
    "lat": 9.8954,
    "lon": 76.0495,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-21T06:32:24.540Z"
  },
  {
    "id": "r665",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Low",
    "lat": 16.9261,
    "lon": 74.4658,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-05-02T12:31:24.540Z"
  },
  {
    "id": "r666",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "High",
    "lat": 29.1362,
    "lon": 76.4928,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-19T01:57:24.540Z"
  },
  {
    "id": "r667",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "High",
    "lat": 20.0243,
    "lon": 86.1215,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-21T09:43:24.540Z"
  },
  {
    "id": "r668",
    "disease": "Karnal Bunt",
    "crop": "Wheat",
    "severity": "High",
    "lat": 15.1939,
    "lon": 73.566,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-08T06:36:24.540Z"
  },
  {
    "id": "r669",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "High",
    "lat": 23.1481,
    "lon": 80.1085,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-03T23:57:24.540Z"
  },
  {
    "id": "r670",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "High",
    "lat": 28.904,
    "lon": 76.3195,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-05-01T03:21:24.540Z"
  },
  {
    "id": "r671",
    "disease": "Grassy Shoot",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 31.0473,
    "lon": 77.0088,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-28T03:52:24.540Z"
  },
  {
    "id": "r672",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 27.0021,
    "lon": 80.8143,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-16T11:13:24.540Z"
  },
  {
    "id": "r673",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 29.6729,
    "lon": 77.7531,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-25T09:18:24.540Z"
  },
  {
    "id": "r674",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "High",
    "lat": 26.6347,
    "lon": 76.0744,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-17T07:55:24.540Z"
  },
  {
    "id": "r675",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 17.3038,
    "lon": 78.3895,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-30T20:58:24.540Z"
  },
  {
    "id": "r676",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 25.8936,
    "lon": 91.7767,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-05-02T22:45:24.540Z"
  },
  {
    "id": "r677",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "High",
    "lat": 12.866,
    "lon": 74.5762,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-08T17:09:24.540Z"
  },
  {
    "id": "r678",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 25.0652,
    "lon": 75.8303,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-28T19:09:24.540Z"
  },
  {
    "id": "r679",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 18.1585,
    "lon": 79.8283,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-05-02T06:02:24.540Z"
  },
  {
    "id": "r680",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 30.9735,
    "lon": 75.8256,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-10T06:28:24.540Z"
  },
  {
    "id": "r681",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 13.1443,
    "lon": 75.0033,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-20T12:44:24.540Z"
  },
  {
    "id": "r682",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "High",
    "lat": 12.5677,
    "lon": 76.7437,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-15T06:23:24.540Z"
  },
  {
    "id": "r683",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "High",
    "lat": 23.9268,
    "lon": 86.963,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-16T01:21:24.540Z"
  },
  {
    "id": "r684",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 25.8668,
    "lon": 85.1137,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-23T07:38:24.540Z"
  },
  {
    "id": "r685",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Low",
    "lat": 18.9013,
    "lon": 73.1309,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-08T20:58:24.540Z"
  },
  {
    "id": "r686",
    "disease": "Fusarium Head Blight",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 22.7459,
    "lon": 88.2778,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-06T12:31:24.540Z"
  },
  {
    "id": "r687",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 23.1821,
    "lon": 75.9527,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-16T08:36:24.540Z"
  },
  {
    "id": "r688",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 17.6522,
    "lon": 78.6911,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-25T22:31:24.540Z"
  },
  {
    "id": "r689",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "High",
    "lat": 25.7443,
    "lon": 91.8943,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-08T08:34:24.540Z"
  },
  {
    "id": "r690",
    "disease": "Gray Leaf Spot",
    "crop": "Maize",
    "severity": "Low",
    "lat": 16.873,
    "lon": 74.3828,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-16T11:25:24.540Z"
  },
  {
    "id": "r691",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 25.2196,
    "lon": 75.8646,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-16T11:20:24.540Z"
  },
  {
    "id": "r692",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "Low",
    "lat": 17.5377,
    "lon": 75.6304,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-29T22:36:24.540Z"
  },
  {
    "id": "r693",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 19.8882,
    "lon": 75.2441,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-22T11:39:24.540Z"
  },
  {
    "id": "r694",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "High",
    "lat": 27.4339,
    "lon": 77.9923,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-12T01:56:24.540Z"
  },
  {
    "id": "r695",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 30.376,
    "lon": 77.8982,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-22T21:56:24.540Z"
  },
  {
    "id": "r696",
    "disease": "Tomato Leaf Curl",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 31.3759,
    "lon": 74.842,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-12T16:20:24.540Z"
  },
  {
    "id": "r697",
    "disease": "Tomato Leaf Curl",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 28.9396,
    "lon": 76.5797,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-13T10:19:24.540Z"
  },
  {
    "id": "r698",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "High",
    "lat": 22.5818,
    "lon": 75.8318,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-29T07:51:24.540Z"
  },
  {
    "id": "r699",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "High",
    "lat": 27.783,
    "lon": 73.5064,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-26T09:47:24.540Z"
  },
  {
    "id": "r700",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "High",
    "lat": 12.7739,
    "lon": 74.842,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-05-02T01:56:24.540Z"
  },
  {
    "id": "r701",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "High",
    "lat": 15.7435,
    "lon": 74.032,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-23T19:36:24.540Z"
  },
  {
    "id": "r702",
    "disease": "Mosaic",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 28.6258,
    "lon": 76.3278,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-05-02T12:03:24.540Z"
  },
  {
    "id": "r703",
    "disease": "Smut",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 27.009,
    "lon": 78.1628,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-08T13:44:24.540Z"
  },
  {
    "id": "r704",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Low",
    "lat": 13.1157,
    "lon": 77.6273,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-21T14:49:24.540Z"
  },
  {
    "id": "r705",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "High",
    "lat": 20.1083,
    "lon": 85.9137,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-28T21:19:24.540Z"
  },
  {
    "id": "r706",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 18.8396,
    "lon": 72.9672,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-19T07:00:24.540Z"
  },
  {
    "id": "r707",
    "disease": "Grassy Shoot",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 23.0794,
    "lon": 79.9681,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-02T18:47:24.540Z"
  },
  {
    "id": "r708",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 15.2934,
    "lon": 74.0192,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-16T15:12:24.540Z"
  },
  {
    "id": "r709",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Low",
    "lat": 25.3361,
    "lon": 75.9505,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-05-02T18:26:24.540Z"
  },
  {
    "id": "r710",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 29.7177,
    "lon": 77.5645,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-14T09:07:24.540Z"
  },
  {
    "id": "r711",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 11.6832,
    "lon": 78.0082,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-05-05T11:11:24.540Z"
  },
  {
    "id": "r712",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "High",
    "lat": 16.0794,
    "lon": 80.1603,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-05-04T12:26:24.540Z"
  },
  {
    "id": "r713",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 27.2009,
    "lon": 76.0373,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-11T03:28:24.540Z"
  },
  {
    "id": "r714",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 18.4721,
    "lon": 78.1569,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-18T15:10:24.540Z"
  },
  {
    "id": "r715",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 29.9596,
    "lon": 74.713,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-05-05T01:45:24.540Z"
  },
  {
    "id": "r716",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "High",
    "lat": 19.7143,
    "lon": 75.416,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-05-01T06:31:24.540Z"
  },
  {
    "id": "r717",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 33.8391,
    "lon": 74.8745,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-05-05T00:39:24.540Z"
  },
  {
    "id": "r718",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "High",
    "lat": 16.4377,
    "lon": 80.2686,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-28T02:40:24.540Z"
  },
  {
    "id": "r719",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 11.6081,
    "lon": 77.9942,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-05-04T00:33:24.540Z"
  },
  {
    "id": "r720",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Low",
    "lat": 22.8541,
    "lon": 88.28,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-29T09:56:24.540Z"
  },
  {
    "id": "r721",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 25.8178,
    "lon": 85.125,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-07T01:37:24.540Z"
  },
  {
    "id": "r722",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 17.5659,
    "lon": 76.2014,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-05-01T10:31:24.540Z"
  },
  {
    "id": "r723",
    "disease": "Fusarium Wilt",
    "crop": "Cotton",
    "severity": "High",
    "lat": 29.9689,
    "lon": 74.9998,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-07T01:45:24.540Z"
  },
  {
    "id": "r724",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "Low",
    "lat": 25.5414,
    "lon": 85.0382,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-08T08:33:24.540Z"
  },
  {
    "id": "r725",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "High",
    "lat": 29.1686,
    "lon": 76.7754,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-05-02T00:20:24.540Z"
  },
  {
    "id": "r726",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 12.9081,
    "lon": 77.4326,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-28T06:35:24.540Z"
  },
  {
    "id": "r727",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "High",
    "lat": 25.0039,
    "lon": 75.9048,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-22T04:57:24.540Z"
  },
  {
    "id": "r728",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 23.1792,
    "lon": 72.6509,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-05-04T21:31:24.540Z"
  },
  {
    "id": "r729",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "High",
    "lat": 26.9773,
    "lon": 83.1158,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-06T10:59:24.540Z"
  },
  {
    "id": "r730",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 25.8952,
    "lon": 91.9481,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-16T12:37:24.540Z"
  },
  {
    "id": "r731",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "Low",
    "lat": 30.0319,
    "lon": 77.5463,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-08T06:31:24.540Z"
  },
  {
    "id": "r732",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 11.6736,
    "lon": 78.2287,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-12T04:51:24.540Z"
  },
  {
    "id": "r733",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Low",
    "lat": 20.5265,
    "lon": 85.6387,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-06T03:56:24.540Z"
  },
  {
    "id": "r734",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Low",
    "lat": 11.9479,
    "lon": 78.2878,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-22T21:54:24.540Z"
  },
  {
    "id": "r735",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "Low",
    "lat": 10.1858,
    "lon": 78.4137,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-18T09:34:24.540Z"
  },
  {
    "id": "r736",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 27.0436,
    "lon": 75.5873,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-18T19:34:24.540Z"
  },
  {
    "id": "r737",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "Low",
    "lat": 27.1142,
    "lon": 75.8567,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-05-03T01:16:24.540Z"
  },
  {
    "id": "r738",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "High",
    "lat": 34.2269,
    "lon": 74.7575,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-23T23:24:24.540Z"
  },
  {
    "id": "r739",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "Low",
    "lat": 25.7471,
    "lon": 92.0074,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-05-01T01:35:24.540Z"
  },
  {
    "id": "r740",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "High",
    "lat": 10.753,
    "lon": 78.8556,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-24T22:52:24.540Z"
  },
  {
    "id": "r741",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 25.4629,
    "lon": 75.9246,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-20T19:00:24.540Z"
  },
  {
    "id": "r742",
    "disease": "Boll Rot",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 23.1672,
    "lon": 72.5614,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-11T05:02:24.540Z"
  },
  {
    "id": "r743",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Low",
    "lat": 16.2447,
    "lon": 80.155,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-12T22:16:24.540Z"
  },
  {
    "id": "r744",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "High",
    "lat": 31.0119,
    "lon": 77.0113,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-17T11:00:24.540Z"
  },
  {
    "id": "r745",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "High",
    "lat": 26.0166,
    "lon": 78.0919,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-18T12:23:24.540Z"
  },
  {
    "id": "r746",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "High",
    "lat": 12.8268,
    "lon": 74.8092,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-16T14:21:24.540Z"
  },
  {
    "id": "r747",
    "disease": "Karnal Bunt",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 12.7154,
    "lon": 74.5731,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-30T10:32:24.540Z"
  },
  {
    "id": "r748",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 32.6297,
    "lon": 74.5602,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-05-05T05:32:24.540Z"
  },
  {
    "id": "r749",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 31.8868,
    "lon": 74.9381,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-18T14:43:24.540Z"
  },
  {
    "id": "r750",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "High",
    "lat": 31.5393,
    "lon": 75.0323,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-25T09:32:24.540Z"
  },
  {
    "id": "r751",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 12.1322,
    "lon": 76.8166,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-09T09:21:24.540Z"
  },
  {
    "id": "r752",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 20.4066,
    "lon": 85.7043,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-20T00:24:24.540Z"
  },
  {
    "id": "r753",
    "disease": "Target Spot",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 25.4372,
    "lon": 91.7969,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-10T08:58:24.540Z"
  },
  {
    "id": "r754",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 18.9934,
    "lon": 73.1672,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-06T11:57:24.540Z"
  },
  {
    "id": "r755",
    "disease": "Fusarium Head Blight",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 19.9855,
    "lon": 75.4365,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-07T04:54:24.540Z"
  },
  {
    "id": "r756",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 27.1106,
    "lon": 75.9454,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-05-03T15:22:24.540Z"
  },
  {
    "id": "r757",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "High",
    "lat": 18.6728,
    "lon": 78.1843,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-24T19:17:24.540Z"
  },
  {
    "id": "r758",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 22.674,
    "lon": 88.6415,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-06T14:07:24.540Z"
  },
  {
    "id": "r759",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 26.7997,
    "lon": 81.0353,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-01T00:03:24.540Z"
  },
  {
    "id": "r760",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "High",
    "lat": 20.117,
    "lon": 75.2448,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-06T06:05:24.540Z"
  },
  {
    "id": "r761",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Low",
    "lat": 26.5914,
    "lon": 80.6931,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-07T02:43:24.540Z"
  },
  {
    "id": "r762",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 24.5263,
    "lon": 73.713,
    "city": "Udaipur",
    "state": "Rajasthan",
    "created_at": "2026-05-02T07:12:24.540Z"
  },
  {
    "id": "r763",
    "disease": "Sheath Blight",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 26.7086,
    "lon": 75.7099,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-11T19:50:24.540Z"
  },
  {
    "id": "r764",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "Low",
    "lat": 31.0638,
    "lon": 77.0279,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-16T03:47:24.540Z"
  },
  {
    "id": "r765",
    "disease": "Early Blight",
    "crop": "Potato",
    "severity": "Low",
    "lat": 29.0267,
    "lon": 76.613,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-15T19:58:24.540Z"
  },
  {
    "id": "r766",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "High",
    "lat": 27.022,
    "lon": 75.614,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-17T11:05:24.540Z"
  },
  {
    "id": "r767",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "Low",
    "lat": 32.9174,
    "lon": 74.5744,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-04-08T23:16:24.540Z"
  },
  {
    "id": "r768",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "High",
    "lat": 27.7284,
    "lon": 73.3651,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-20T18:49:24.540Z"
  },
  {
    "id": "r769",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 24.7693,
    "lon": 73.9787,
    "city": "Udaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-22T21:28:24.540Z"
  },
  {
    "id": "r770",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 22.4412,
    "lon": 88.2023,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-20T17:36:24.540Z"
  },
  {
    "id": "r771",
    "disease": "Common Rust",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 20.3077,
    "lon": 85.6697,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-14T17:09:24.540Z"
  },
  {
    "id": "r772",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 16.2071,
    "lon": 80.1973,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-12T11:09:24.540Z"
  },
  {
    "id": "r773",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 17.4717,
    "lon": 75.6611,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-05-04T18:38:24.540Z"
  },
  {
    "id": "r774",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 13.3343,
    "lon": 80.4799,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-12T11:18:24.540Z"
  },
  {
    "id": "r775",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "High",
    "lat": 27.1877,
    "lon": 78.2987,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-04T14:43:24.540Z"
  },
  {
    "id": "r776",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 30.307,
    "lon": 74.7956,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-17T20:47:24.540Z"
  },
  {
    "id": "r777",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 12.6993,
    "lon": 74.5728,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-19T20:09:24.540Z"
  },
  {
    "id": "r778",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "Low",
    "lat": 21.2578,
    "lon": 78.847,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-10T14:16:24.540Z"
  },
  {
    "id": "r779",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "High",
    "lat": 28.2667,
    "lon": 73.5219,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-07T21:50:24.540Z"
  },
  {
    "id": "r780",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 25.9235,
    "lon": 77.9075,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-28T04:36:24.540Z"
  },
  {
    "id": "r781",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "High",
    "lat": 18.7869,
    "lon": 74.1537,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-05-03T23:16:24.540Z"
  },
  {
    "id": "r782",
    "disease": "Common Rust",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 18.0604,
    "lon": 79.6685,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-14T07:55:24.540Z"
  },
  {
    "id": "r783",
    "disease": "Pokkah Boeng",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 10.077,
    "lon": 76.1487,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-05-04T02:02:24.540Z"
  },
  {
    "id": "r784",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "High",
    "lat": 28.2619,
    "lon": 73.3565,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-22T20:29:24.540Z"
  },
  {
    "id": "r785",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 22.9191,
    "lon": 72.3157,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-16T10:31:24.540Z"
  },
  {
    "id": "r786",
    "disease": "Cercospora Leaf Spot",
    "crop": "Banana",
    "severity": "Low",
    "lat": 30.4284,
    "lon": 74.9677,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-07T01:51:24.540Z"
  },
  {
    "id": "r787",
    "disease": "Tungro",
    "crop": "Rice",
    "severity": "Low",
    "lat": 17.0976,
    "lon": 78.5055,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-12T11:06:24.540Z"
  },
  {
    "id": "r788",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "High",
    "lat": 32.9763,
    "lon": 75.0448,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-04-28T06:13:24.540Z"
  },
  {
    "id": "r789",
    "disease": "Gray Leaf Spot",
    "crop": "Maize",
    "severity": "High",
    "lat": 24.9347,
    "lon": 75.8424,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-25T05:51:24.540Z"
  },
  {
    "id": "r790",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "High",
    "lat": 25.6373,
    "lon": 84.8677,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-29T14:57:24.540Z"
  },
  {
    "id": "r791",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 23.505,
    "lon": 86.8843,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-10T02:04:24.540Z"
  },
  {
    "id": "r792",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "High",
    "lat": 20.5124,
    "lon": 85.8693,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-19T21:42:24.540Z"
  },
  {
    "id": "r793",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "High",
    "lat": 19.0703,
    "lon": 72.8205,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-13T10:05:24.540Z"
  },
  {
    "id": "r794",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "High",
    "lat": 25.5208,
    "lon": 91.9849,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-21T06:31:24.540Z"
  },
  {
    "id": "r795",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "High",
    "lat": 12.1123,
    "lon": 76.4296,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-24T13:02:24.540Z"
  },
  {
    "id": "r796",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 30.2483,
    "lon": 78.1895,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-18T01:56:24.540Z"
  },
  {
    "id": "r797",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Low",
    "lat": 27.7947,
    "lon": 73.1259,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-26T04:00:24.540Z"
  },
  {
    "id": "r798",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "High",
    "lat": 20.2107,
    "lon": 85.6008,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-22T10:55:24.540Z"
  },
  {
    "id": "r799",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 10.032,
    "lon": 76.4785,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-25T20:40:24.540Z"
  },
  {
    "id": "r800",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "High",
    "lat": 26.556,
    "lon": 80.8533,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-08T03:38:24.540Z"
  },
  {
    "id": "r801",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "Low",
    "lat": 26.1662,
    "lon": 78.0223,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-13T20:22:24.540Z"
  },
  {
    "id": "r802",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "High",
    "lat": 27.0524,
    "lon": 77.917,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-30T23:56:24.540Z"
  },
  {
    "id": "r803",
    "disease": "Tomato Leaf Curl",
    "crop": "Tomato",
    "severity": "High",
    "lat": 16.4362,
    "lon": 74.4,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-23T07:39:24.540Z"
  },
  {
    "id": "r804",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Low",
    "lat": 18.9396,
    "lon": 77.8642,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-12T04:34:24.540Z"
  },
  {
    "id": "r805",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 30.2777,
    "lon": 74.8395,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-21T11:12:24.540Z"
  },
  {
    "id": "r806",
    "disease": "Gray Leaf Spot",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 21.2126,
    "lon": 79.3401,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-05-01T02:05:24.540Z"
  },
  {
    "id": "r807",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "High",
    "lat": 12.81,
    "lon": 77.8638,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-09T10:32:24.540Z"
  },
  {
    "id": "r808",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 11.7289,
    "lon": 78.229,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-13T19:07:24.540Z"
  },
  {
    "id": "r809",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "High",
    "lat": 30.3568,
    "lon": 75.0268,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-29T09:48:24.540Z"
  },
  {
    "id": "r810",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "Low",
    "lat": 22.8365,
    "lon": 72.4924,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-30T05:32:24.540Z"
  },
  {
    "id": "r811",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 30.1765,
    "lon": 78.2578,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-13T20:12:24.540Z"
  },
  {
    "id": "r812",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 31.7053,
    "lon": 75.1087,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-25T16:31:24.540Z"
  },
  {
    "id": "r813",
    "disease": "Target Spot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 12.6564,
    "lon": 75.0421,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-13T20:43:24.540Z"
  },
  {
    "id": "r814",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 9.839,
    "lon": 77.9522,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-07T22:20:24.540Z"
  },
  {
    "id": "r815",
    "disease": "Powdery Mildew",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 16.7318,
    "lon": 74.2562,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-25T05:55:24.540Z"
  },
  {
    "id": "r816",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "Low",
    "lat": 24.923,
    "lon": 85.2819,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-09T14:08:24.540Z"
  },
  {
    "id": "r817",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 25.567,
    "lon": 85.3901,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-26T12:40:24.540Z"
  },
  {
    "id": "r818",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 16.6736,
    "lon": 73.9956,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-10T21:16:24.540Z"
  },
  {
    "id": "r819",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 30.1177,
    "lon": 77.7601,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-05-03T05:33:24.540Z"
  },
  {
    "id": "r820",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "High",
    "lat": 32.9321,
    "lon": 74.9711,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-04-19T13:56:24.540Z"
  },
  {
    "id": "r821",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "Low",
    "lat": 25.4999,
    "lon": 84.9676,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-05-01T08:55:24.540Z"
  },
  {
    "id": "r822",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 18.8258,
    "lon": 78.0792,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-12T20:25:24.540Z"
  },
  {
    "id": "r823",
    "disease": "Boll Rot",
    "crop": "Cotton",
    "severity": "High",
    "lat": 18.6826,
    "lon": 78.2512,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-11T00:35:24.540Z"
  },
  {
    "id": "r824",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 23.0482,
    "lon": 79.728,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-03T16:38:24.540Z"
  },
  {
    "id": "r825",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 12.7961,
    "lon": 74.6465,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-28T01:39:24.540Z"
  },
  {
    "id": "r826",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 26.8019,
    "lon": 88.1975,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-16T19:01:24.540Z"
  },
  {
    "id": "r827",
    "disease": "Bacterial Blight",
    "crop": "Rice",
    "severity": "High",
    "lat": 32.8501,
    "lon": 74.9781,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-04-29T20:38:24.540Z"
  },
  {
    "id": "r828",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Low",
    "lat": 24.7933,
    "lon": 84.7125,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-21T09:01:24.540Z"
  },
  {
    "id": "r829",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 26.6079,
    "lon": 81.062,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-29T07:50:24.540Z"
  },
  {
    "id": "r830",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "High",
    "lat": 20.1626,
    "lon": 85.9797,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-05-02T01:54:24.540Z"
  },
  {
    "id": "r831",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 12.8582,
    "lon": 74.8508,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-06T06:00:24.540Z"
  },
  {
    "id": "r832",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "High",
    "lat": 29.741,
    "lon": 77.7627,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-08T16:23:24.540Z"
  },
  {
    "id": "r833",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "High",
    "lat": 23.2193,
    "lon": 72.5441,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-30T22:51:24.540Z"
  },
  {
    "id": "r834",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "Low",
    "lat": 25.4563,
    "lon": 76.0082,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-30T07:55:24.540Z"
  },
  {
    "id": "r835",
    "disease": "Tomato Late Blight",
    "crop": "Tomato",
    "severity": "High",
    "lat": 18.9696,
    "lon": 78.2111,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-26T15:48:24.540Z"
  },
  {
    "id": "r836",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 29.0454,
    "lon": 76.7446,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-15T07:31:24.540Z"
  },
  {
    "id": "r837",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "High",
    "lat": 27.3746,
    "lon": 78.1077,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-19T22:10:24.540Z"
  },
  {
    "id": "r838",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 30.9962,
    "lon": 76.8965,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-05-03T14:43:24.540Z"
  },
  {
    "id": "r839",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 23.9719,
    "lon": 87.2231,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-05-04T15:33:24.540Z"
  },
  {
    "id": "r840",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "High",
    "lat": 27.0455,
    "lon": 81.1515,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-12T01:27:24.540Z"
  },
  {
    "id": "r841",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 17.3776,
    "lon": 78.1933,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-12T19:15:24.540Z"
  },
  {
    "id": "r842",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 31.4895,
    "lon": 74.728,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-13T13:21:24.540Z"
  },
  {
    "id": "r843",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 27.2871,
    "lon": 78.0712,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-26T23:51:24.540Z"
  },
  {
    "id": "r844",
    "disease": "Gray Leaf Spot",
    "crop": "Maize",
    "severity": "High",
    "lat": 25.4733,
    "lon": 76.1235,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-25T03:56:24.540Z"
  },
  {
    "id": "r845",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 22.7527,
    "lon": 88.174,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-09T00:05:24.540Z"
  },
  {
    "id": "r846",
    "disease": "Boll Rot",
    "crop": "Cotton",
    "severity": "High",
    "lat": 22.773,
    "lon": 88.3687,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-30T22:26:24.540Z"
  },
  {
    "id": "r847",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "High",
    "lat": 16.5281,
    "lon": 80.1374,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-19T11:07:24.540Z"
  },
  {
    "id": "r848",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "High",
    "lat": 16.3418,
    "lon": 80.3722,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-05-05T08:11:24.540Z"
  },
  {
    "id": "r849",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "Low",
    "lat": 23.1209,
    "lon": 79.92,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-01T22:28:24.540Z"
  },
  {
    "id": "r850",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 30.8474,
    "lon": 76.9679,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-28T10:04:24.540Z"
  },
  {
    "id": "r851",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 22.8844,
    "lon": 75.6083,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-05T05:12:24.540Z"
  },
  {
    "id": "r852",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 13.1666,
    "lon": 80.178,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-06T21:21:24.540Z"
  },
  {
    "id": "r853",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "High",
    "lat": 12.9413,
    "lon": 74.8044,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-24T04:05:24.540Z"
  },
  {
    "id": "r854",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "High",
    "lat": 30.6834,
    "lon": 76.0483,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-26T11:52:24.540Z"
  },
  {
    "id": "r855",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 17.1047,
    "lon": 78.3588,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-21T11:24:24.540Z"
  },
  {
    "id": "r856",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "High",
    "lat": 21.1825,
    "lon": 79.167,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-12T10:16:24.540Z"
  },
  {
    "id": "r857",
    "disease": "Smut",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 23.9048,
    "lon": 87.1186,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-11T01:45:24.540Z"
  },
  {
    "id": "r858",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "High",
    "lat": 30.8158,
    "lon": 77.1407,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-20T04:06:24.540Z"
  },
  {
    "id": "r859",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Low",
    "lat": 23.4574,
    "lon": 86.7946,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-18T00:02:24.540Z"
  },
  {
    "id": "r860",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "High",
    "lat": 30.4149,
    "lon": 74.7188,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-23T18:39:24.540Z"
  },
  {
    "id": "r861",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 24.7713,
    "lon": 73.9827,
    "city": "Udaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-20T02:52:24.540Z"
  },
  {
    "id": "r862",
    "disease": "Botrytis Bunch Rot",
    "crop": "Grapes",
    "severity": "High",
    "lat": 16.9736,
    "lon": 74.1333,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-13T02:31:24.540Z"
  },
  {
    "id": "r863",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 16.3659,
    "lon": 80.1469,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-14T05:37:24.540Z"
  },
  {
    "id": "r864",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 23.0436,
    "lon": 76.0376,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-11T14:41:24.540Z"
  },
  {
    "id": "r865",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 30.0934,
    "lon": 77.8147,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-23T14:19:24.540Z"
  },
  {
    "id": "r866",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "Low",
    "lat": 17.6179,
    "lon": 75.6619,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-26T22:19:24.540Z"
  },
  {
    "id": "r867",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 12.6256,
    "lon": 74.6725,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-28T07:26:24.540Z"
  },
  {
    "id": "r868",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 26.436,
    "lon": 91.5599,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-14T04:45:24.540Z"
  },
  {
    "id": "r869",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 27.8154,
    "lon": 73.0216,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-25T20:06:24.540Z"
  },
  {
    "id": "r870",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 28.7514,
    "lon": 76.6712,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-19T13:24:24.540Z"
  },
  {
    "id": "r871",
    "disease": "Powdery Mildew",
    "crop": "Wheat",
    "severity": "High",
    "lat": 22.8023,
    "lon": 88.3292,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-20T15:27:24.540Z"
  },
  {
    "id": "r872",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "High",
    "lat": 20.3362,
    "lon": 85.8082,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-05-03T22:30:24.540Z"
  },
  {
    "id": "r873",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 17.8094,
    "lon": 79.3041,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-09T16:23:24.540Z"
  },
  {
    "id": "r874",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "High",
    "lat": 26.0099,
    "lon": 91.7868,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-13T07:29:24.540Z"
  },
  {
    "id": "r875",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 30.9964,
    "lon": 76.964,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-13T22:38:24.540Z"
  },
  {
    "id": "r876",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "Low",
    "lat": 27.0898,
    "lon": 81.2342,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-23T11:51:24.540Z"
  },
  {
    "id": "r877",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 27.9938,
    "lon": 73.1002,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-18T08:22:24.540Z"
  },
  {
    "id": "r878",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "High",
    "lat": 13.0801,
    "lon": 80.0257,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-06T07:06:24.540Z"
  },
  {
    "id": "r879",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 12.9849,
    "lon": 80.4687,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-18T13:22:24.540Z"
  },
  {
    "id": "r880",
    "disease": "Smut",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 24.879,
    "lon": 73.5863,
    "city": "Udaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-28T14:14:24.540Z"
  },
  {
    "id": "r881",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 13.3347,
    "lon": 80.4467,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-23T11:04:24.540Z"
  },
  {
    "id": "r882",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "High",
    "lat": 19.2401,
    "lon": 72.8584,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-08T02:32:24.540Z"
  },
  {
    "id": "r883",
    "disease": "Tungro",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 17.327,
    "lon": 78.3215,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-14T19:22:24.540Z"
  },
  {
    "id": "r884",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "Low",
    "lat": 22.7909,
    "lon": 72.5505,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-17T21:44:24.540Z"
  },
  {
    "id": "r885",
    "disease": "Gray Leaf Spot",
    "crop": "Maize",
    "severity": "Low",
    "lat": 23.6738,
    "lon": 87.2472,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-23T00:29:24.540Z"
  },
  {
    "id": "r886",
    "disease": "Tomato Late Blight",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 18.599,
    "lon": 73.8035,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-09T09:46:24.540Z"
  },
  {
    "id": "r887",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "High",
    "lat": 34.3004,
    "lon": 74.9187,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-26T14:06:24.540Z"
  },
  {
    "id": "r888",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 29.9327,
    "lon": 74.7591,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-16T00:59:24.540Z"
  },
  {
    "id": "r889",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "Low",
    "lat": 11.5468,
    "lon": 78.2324,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-17T23:32:24.540Z"
  },
  {
    "id": "r890",
    "disease": "Sheath Blight",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 29.6876,
    "lon": 77.6281,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-13T23:56:24.540Z"
  },
  {
    "id": "r891",
    "disease": "Fusarium Head Blight",
    "crop": "Wheat",
    "severity": "High",
    "lat": 33.9442,
    "lon": 74.8138,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-20T22:44:24.540Z"
  },
  {
    "id": "r892",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 31.0124,
    "lon": 76.1157,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-05-01T07:12:24.540Z"
  },
  {
    "id": "r893",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Low",
    "lat": 16.6908,
    "lon": 73.9704,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-05-04T16:45:24.540Z"
  },
  {
    "id": "r894",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 27.1395,
    "lon": 78.2352,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-26T13:05:24.540Z"
  },
  {
    "id": "r895",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 20.0768,
    "lon": 85.8698,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-12T06:31:24.540Z"
  },
  {
    "id": "r896",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "Low",
    "lat": 28.4102,
    "lon": 76.8448,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-04-18T11:25:24.540Z"
  },
  {
    "id": "r897",
    "disease": "Black Spot",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 25.099,
    "lon": 75.9564,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-14T20:03:24.540Z"
  },
  {
    "id": "r898",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 13.1646,
    "lon": 80.2183,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-21T09:36:24.540Z"
  },
  {
    "id": "r899",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 30.3027,
    "lon": 78.2083,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-09T07:59:24.540Z"
  },
  {
    "id": "r900",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Low",
    "lat": 25.8433,
    "lon": 85.2828,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-13T02:41:24.540Z"
  },
  {
    "id": "r901",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 9.643,
    "lon": 76.4911,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-13T18:29:24.540Z"
  },
  {
    "id": "r902",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "High",
    "lat": 22.3841,
    "lon": 88.1144,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-12T23:12:24.540Z"
  },
  {
    "id": "r903",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 18.7026,
    "lon": 78.1256,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-09T21:44:24.540Z"
  },
  {
    "id": "r904",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 11.8527,
    "lon": 78.2735,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-05T21:06:24.540Z"
  },
  {
    "id": "r905",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Low",
    "lat": 18.7033,
    "lon": 77.8156,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-05-04T18:51:24.540Z"
  },
  {
    "id": "r906",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 13.244,
    "lon": 80.0734,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-14T21:07:24.540Z"
  },
  {
    "id": "r907",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "High",
    "lat": 24.6588,
    "lon": 73.4181,
    "city": "Udaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-28T20:26:24.540Z"
  },
  {
    "id": "r908",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 18.6842,
    "lon": 73.852,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-17T06:18:24.540Z"
  },
  {
    "id": "r909",
    "disease": "Grassy Shoot",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 23.3562,
    "lon": 75.9549,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-04T20:03:24.540Z"
  },
  {
    "id": "r910",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "High",
    "lat": 30.0663,
    "lon": 75.0143,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-26T07:11:24.540Z"
  },
  {
    "id": "r911",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 25.9206,
    "lon": 92.0293,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-11T08:36:24.540Z"
  },
  {
    "id": "r912",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "High",
    "lat": 23.2564,
    "lon": 79.8574,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-28T15:18:24.540Z"
  },
  {
    "id": "r913",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 19.785,
    "lon": 73.941,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-05-03T15:44:24.540Z"
  },
  {
    "id": "r914",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "High",
    "lat": 9.6392,
    "lon": 78.2324,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-11T11:30:24.540Z"
  },
  {
    "id": "r915",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 17.3147,
    "lon": 78.3621,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-21T06:55:24.540Z"
  },
  {
    "id": "r916",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 29.9525,
    "lon": 74.9741,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-17T23:52:24.540Z"
  },
  {
    "id": "r917",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "High",
    "lat": 25.8491,
    "lon": 85.1569,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-19T09:25:24.540Z"
  },
  {
    "id": "r918",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "Low",
    "lat": 27.1664,
    "lon": 76.0236,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-22T13:51:24.540Z"
  },
  {
    "id": "r919",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "High",
    "lat": 26.9156,
    "lon": 75.8408,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-23T05:28:24.540Z"
  },
  {
    "id": "r920",
    "disease": "Early Blight",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 22.9574,
    "lon": 80.0327,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-17T03:31:24.540Z"
  },
  {
    "id": "r921",
    "disease": "Leaf Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 31.8769,
    "lon": 75.082,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-14T01:28:24.540Z"
  },
  {
    "id": "r922",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "High",
    "lat": 18.1506,
    "lon": 79.3583,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-05-02T19:53:24.540Z"
  },
  {
    "id": "r923",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 25.4976,
    "lon": 92.071,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-27T13:40:24.540Z"
  },
  {
    "id": "r924",
    "disease": "Mosaic",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 19.2587,
    "lon": 72.9889,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-05-04T15:22:24.540Z"
  },
  {
    "id": "r925",
    "disease": "Sheath Blight",
    "crop": "Rice",
    "severity": "Low",
    "lat": 18.5125,
    "lon": 73.894,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-26T05:55:24.540Z"
  },
  {
    "id": "r926",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "High",
    "lat": 21.2016,
    "lon": 79.1826,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-20T17:33:24.540Z"
  },
  {
    "id": "r927",
    "disease": "Powdery Mildew",
    "crop": "Wheat",
    "severity": "High",
    "lat": 26.0903,
    "lon": 91.7336,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-30T04:38:24.540Z"
  },
  {
    "id": "r928",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 31.0012,
    "lon": 75.8164,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-28T14:36:24.540Z"
  },
  {
    "id": "r929",
    "disease": "Tomato Late Blight",
    "crop": "Tomato",
    "severity": "High",
    "lat": 11.9075,
    "lon": 77.8871,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-27T19:48:24.540Z"
  },
  {
    "id": "r930",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "High",
    "lat": 12.4336,
    "lon": 76.3765,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-12T04:29:24.540Z"
  },
  {
    "id": "r931",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 12.8658,
    "lon": 80.2186,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-20T16:07:24.540Z"
  },
  {
    "id": "r932",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 23.2713,
    "lon": 76.0631,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-20T06:32:24.540Z"
  },
  {
    "id": "r933",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "High",
    "lat": 19.105,
    "lon": 72.6436,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-14T21:43:24.540Z"
  },
  {
    "id": "r934",
    "disease": "Karnal Bunt",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 25.503,
    "lon": 91.9292,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-05-05T16:23:24.540Z"
  },
  {
    "id": "r935",
    "disease": "Grassy Shoot",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 17.9837,
    "lon": 79.331,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-23T16:12:24.540Z"
  },
  {
    "id": "r936",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "Low",
    "lat": 11.9252,
    "lon": 78.4011,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-29T19:57:24.540Z"
  },
  {
    "id": "r937",
    "disease": "Cercospora Leaf Spot",
    "crop": "Banana",
    "severity": "High",
    "lat": 19.2767,
    "lon": 72.7169,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-05-02T12:07:24.540Z"
  },
  {
    "id": "r938",
    "disease": "Bacterial Blight",
    "crop": "Rice",
    "severity": "High",
    "lat": 23.2132,
    "lon": 72.3886,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-27T12:11:24.540Z"
  },
  {
    "id": "r939",
    "disease": "Bacterial Blight",
    "crop": "Rice",
    "severity": "Low",
    "lat": 24.815,
    "lon": 73.6046,
    "city": "Udaipur",
    "state": "Rajasthan",
    "created_at": "2026-05-04T07:58:24.540Z"
  },
  {
    "id": "r940",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 26.649,
    "lon": 88.3211,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-19T04:39:24.540Z"
  },
  {
    "id": "r941",
    "disease": "Tomato Late Blight",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 26.9732,
    "lon": 88.4374,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-17T15:42:24.540Z"
  },
  {
    "id": "r942",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "Low",
    "lat": 23.2016,
    "lon": 72.7224,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-12T15:25:24.540Z"
  },
  {
    "id": "r943",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "High",
    "lat": 29.9181,
    "lon": 77.7976,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-15T12:16:24.540Z"
  },
  {
    "id": "r944",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "High",
    "lat": 17.7961,
    "lon": 75.9153,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-12T17:44:24.540Z"
  },
  {
    "id": "r945",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 19.7419,
    "lon": 73.5966,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-17T13:38:24.540Z"
  },
  {
    "id": "r946",
    "disease": "Black Spot",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 18.6184,
    "lon": 77.8738,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-14T12:30:24.540Z"
  },
  {
    "id": "r947",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 23.4403,
    "lon": 75.5049,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-30T05:28:24.540Z"
  },
  {
    "id": "r948",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "High",
    "lat": 26.8916,
    "lon": 75.6841,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-30T13:00:24.540Z"
  },
  {
    "id": "r949",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "Low",
    "lat": 31.0671,
    "lon": 77.4083,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-05-01T02:41:24.540Z"
  },
  {
    "id": "r950",
    "disease": "Septoria Leaf Spot",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 20.1926,
    "lon": 73.5241,
    "city": "Nashik",
    "state": "Maharashtra",
    "created_at": "2026-04-22T06:43:24.540Z"
  },
  {
    "id": "r951",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "Low",
    "lat": 22.7647,
    "lon": 88.4725,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-12T07:01:24.540Z"
  },
  {
    "id": "r952",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "High",
    "lat": 25.6345,
    "lon": 85.0948,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-08T10:06:24.540Z"
  },
  {
    "id": "r953",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 16.5655,
    "lon": 73.969,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-12T02:06:24.540Z"
  },
  {
    "id": "r954",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "Low",
    "lat": 30.3389,
    "lon": 75.0719,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-20T15:42:24.540Z"
  },
  {
    "id": "r955",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "Low",
    "lat": 12.8894,
    "lon": 74.7046,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-18T12:17:24.540Z"
  },
  {
    "id": "r956",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "High",
    "lat": 28.6775,
    "lon": 76.6383,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-21T17:12:24.540Z"
  },
  {
    "id": "r957",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 12.5155,
    "lon": 76.614,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-23T00:14:24.540Z"
  },
  {
    "id": "r958",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 27.01,
    "lon": 75.5592,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-22T22:16:24.540Z"
  },
  {
    "id": "r959",
    "disease": "Black Spot",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 11.5849,
    "lon": 77.9052,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-17T07:30:24.540Z"
  },
  {
    "id": "r960",
    "disease": "Smut",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 22.8399,
    "lon": 88.6386,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-22T14:37:24.540Z"
  },
  {
    "id": "r961",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Low",
    "lat": 34.289,
    "lon": 74.8837,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-11T23:28:24.540Z"
  },
  {
    "id": "r962",
    "disease": "Common Rust",
    "crop": "Maize",
    "severity": "Low",
    "lat": 26.9892,
    "lon": 75.6094,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-05-01T22:23:24.540Z"
  },
  {
    "id": "r963",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "Low",
    "lat": 26.6755,
    "lon": 76.0216,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-05-03T15:43:24.540Z"
  },
  {
    "id": "r964",
    "disease": "Black Spot",
    "crop": "Citrus",
    "severity": "High",
    "lat": 30.3538,
    "lon": 77.8528,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-21T13:56:24.540Z"
  },
  {
    "id": "r965",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Low",
    "lat": 25.4472,
    "lon": 75.772,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-11T13:24:24.540Z"
  },
  {
    "id": "r966",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "High",
    "lat": 15.7191,
    "lon": 73.8516,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-05-05T03:08:24.540Z"
  },
  {
    "id": "r967",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 12.5109,
    "lon": 76.7346,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-27T16:25:24.540Z"
  },
  {
    "id": "r968",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 29.7261,
    "lon": 77.8373,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-03T07:57:24.540Z"
  },
  {
    "id": "r969",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 9.7324,
    "lon": 76.3436,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-18T01:19:24.540Z"
  },
  {
    "id": "r970",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 9.6781,
    "lon": 78.0868,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-23T02:24:24.540Z"
  },
  {
    "id": "r971",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 22.5066,
    "lon": 76.1501,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-09T06:47:24.540Z"
  },
  {
    "id": "r972",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "Low",
    "lat": 27.0893,
    "lon": 80.9345,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-08T06:04:24.540Z"
  },
  {
    "id": "r973",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "High",
    "lat": 18.2267,
    "lon": 79.7967,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-29T21:45:24.540Z"
  },
  {
    "id": "r974",
    "disease": "Tomato Leaf Curl",
    "crop": "Tomato",
    "severity": "High",
    "lat": 18.9105,
    "lon": 77.8161,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-05-02T06:14:24.540Z"
  },
  {
    "id": "r975",
    "disease": "Moko Disease",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 26.9615,
    "lon": 78.0273,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-29T23:30:24.540Z"
  },
  {
    "id": "r976",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "High",
    "lat": 26.3495,
    "lon": 78.227,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-10T10:59:24.540Z"
  },
  {
    "id": "r977",
    "disease": "Leaf Rust",
    "crop": "Wheat",
    "severity": "High",
    "lat": 17.5651,
    "lon": 76.0937,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-21T10:46:24.540Z"
  },
  {
    "id": "r978",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "Low",
    "lat": 9.988,
    "lon": 76.382,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-27T20:00:24.540Z"
  },
  {
    "id": "r979",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 26.9941,
    "lon": 78.1445,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-24T18:44:24.540Z"
  },
  {
    "id": "r980",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 18.5383,
    "lon": 74.0074,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-13T20:06:24.540Z"
  },
  {
    "id": "r981",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Low",
    "lat": 16.2105,
    "lon": 80.3574,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-29T21:33:24.540Z"
  },
  {
    "id": "r982",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 22.5753,
    "lon": 75.9441,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-30T18:12:24.540Z"
  },
  {
    "id": "r983",
    "disease": "Grassy Shoot",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 30.5622,
    "lon": 77.9657,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-23T17:57:24.540Z"
  },
  {
    "id": "r984",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "High",
    "lat": 31.7347,
    "lon": 74.6146,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-12T01:45:24.540Z"
  },
  {
    "id": "r985",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "Low",
    "lat": 28.8691,
    "lon": 76.8442,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-15T07:09:24.540Z"
  },
  {
    "id": "r986",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 19.0926,
    "lon": 72.8888,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-29T01:39:24.540Z"
  },
  {
    "id": "r987",
    "disease": "Early Blight",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 30.0643,
    "lon": 78.1249,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-04-07T11:12:24.540Z"
  },
  {
    "id": "r988",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 22.8368,
    "lon": 72.4045,
    "city": "Ahmedabad",
    "state": "Gujarat",
    "created_at": "2026-04-07T12:14:24.540Z"
  },
  {
    "id": "r989",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "High",
    "lat": 28.9549,
    "lon": 76.6847,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-26T21:29:24.540Z"
  },
  {
    "id": "r990",
    "disease": "Sheath Blight",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 11.639,
    "lon": 78.0857,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-05-03T01:58:24.540Z"
  },
  {
    "id": "r991",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 27.8182,
    "lon": 73.302,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-05-04T16:22:24.540Z"
  },
  {
    "id": "r992",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 28.9641,
    "lon": 76.3313,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-11T00:47:24.540Z"
  },
  {
    "id": "r993",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 16.9664,
    "lon": 74.5368,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-16T08:18:24.540Z"
  },
  {
    "id": "r994",
    "disease": "Blister Blight",
    "crop": "Tea",
    "severity": "High",
    "lat": 26.677,
    "lon": 83.4998,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-23T09:02:24.540Z"
  },
  {
    "id": "r995",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 12.821,
    "lon": 77.6735,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-26T20:38:24.540Z"
  },
  {
    "id": "r996",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 22.665,
    "lon": 75.7911,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-14T20:00:24.540Z"
  },
  {
    "id": "r997",
    "disease": "Powdery Mildew",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 15.6363,
    "lon": 73.5783,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-13T16:53:24.540Z"
  },
  {
    "id": "r998",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "High",
    "lat": 20.8928,
    "lon": 79.0613,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-07T06:55:24.540Z"
  },
  {
    "id": "r999",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 23.4434,
    "lon": 79.9935,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-24T07:01:24.540Z"
  },
  {
    "id": "r1000",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 9.6319,
    "lon": 76.1419,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-04-13T16:43:24.540Z"
  },
  {
    "id": "r1001",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "Low",
    "lat": 27.7649,
    "lon": 73.0728,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-26T07:45:24.540Z"
  },
  {
    "id": "r1002",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "High",
    "lat": 24.9173,
    "lon": 84.77,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-27T13:57:24.540Z"
  },
  {
    "id": "r1003",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "High",
    "lat": 26.7137,
    "lon": 83.5313,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-02T06:47:24.540Z"
  },
  {
    "id": "r1004",
    "disease": "Target Spot",
    "crop": "Cotton",
    "severity": "High",
    "lat": 18.7424,
    "lon": 78.2822,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-26T05:34:24.540Z"
  },
  {
    "id": "r1005",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 11.4873,
    "lon": 78.1091,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-07T10:29:24.540Z"
  },
  {
    "id": "r1006",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "High",
    "lat": 25.0351,
    "lon": 84.7879,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-11T18:36:24.540Z"
  },
  {
    "id": "r1007",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 22.6973,
    "lon": 88.6142,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-27T04:41:24.540Z"
  },
  {
    "id": "r1008",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "High",
    "lat": 12.0872,
    "lon": 76.7275,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-21T13:36:24.540Z"
  },
  {
    "id": "r1009",
    "disease": "Panama Disease",
    "crop": "Banana",
    "severity": "High",
    "lat": 18.9377,
    "lon": 77.8037,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-12T13:51:24.540Z"
  },
  {
    "id": "r1010",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "High",
    "lat": 27.1937,
    "lon": 75.9927,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-18T01:36:24.540Z"
  },
  {
    "id": "r1011",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Low",
    "lat": 23.5612,
    "lon": 86.9702,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-07T13:54:24.540Z"
  },
  {
    "id": "r1012",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 13.1034,
    "lon": 77.8449,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-17T16:35:24.540Z"
  },
  {
    "id": "r1013",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Low",
    "lat": 30.8846,
    "lon": 75.585,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-25T11:04:24.540Z"
  },
  {
    "id": "r1014",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 28.7131,
    "lon": 76.8582,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-21T22:22:24.540Z"
  },
  {
    "id": "r1015",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "High",
    "lat": 27.0947,
    "lon": 75.5069,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-14T09:27:24.540Z"
  },
  {
    "id": "r1016",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "High",
    "lat": 26.9272,
    "lon": 75.6148,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-12T12:41:24.540Z"
  },
  {
    "id": "r1017",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "High",
    "lat": 26.4437,
    "lon": 88.6318,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-05-03T13:41:24.540Z"
  },
  {
    "id": "r1018",
    "disease": "Boll Rot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 17.6697,
    "lon": 78.572,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-07T07:48:24.540Z"
  },
  {
    "id": "r1019",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "High",
    "lat": 27.1654,
    "lon": 78.0906,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-15T20:55:24.540Z"
  },
  {
    "id": "r1020",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "Low",
    "lat": 20.0115,
    "lon": 75.6168,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-22T19:42:24.540Z"
  },
  {
    "id": "r1021",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 22.2796,
    "lon": 88.6199,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-25T01:15:24.540Z"
  },
  {
    "id": "r1022",
    "disease": "Early Blight",
    "crop": "Potato",
    "severity": "High",
    "lat": 26.5483,
    "lon": 83.4323,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-21T05:47:24.540Z"
  },
  {
    "id": "r1023",
    "disease": "Septoria Leaf Spot",
    "crop": "Tomato",
    "severity": "High",
    "lat": 11.5705,
    "lon": 78.2668,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-24T02:25:24.540Z"
  },
  {
    "id": "r1024",
    "disease": "Gray Leaf Spot",
    "crop": "Maize",
    "severity": "Low",
    "lat": 10.9656,
    "lon": 78.7461,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-05-04T21:48:24.540Z"
  },
  {
    "id": "r1025",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 25.08,
    "lon": 75.9872,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-13T15:17:24.540Z"
  },
  {
    "id": "r1026",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Low",
    "lat": 31.1392,
    "lon": 77.4335,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-23T21:57:24.540Z"
  },
  {
    "id": "r1027",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 26.3307,
    "lon": 78.0178,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-15T10:50:24.540Z"
  },
  {
    "id": "r1028",
    "disease": "Septoria Leaf Spot",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 26.0364,
    "lon": 91.7324,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-30T09:56:24.540Z"
  },
  {
    "id": "r1029",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "High",
    "lat": 23.1332,
    "lon": 79.7849,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-23T07:56:24.540Z"
  },
  {
    "id": "r1030",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "High",
    "lat": 26.7668,
    "lon": 88.3622,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-09T04:23:24.540Z"
  },
  {
    "id": "r1031",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "Low",
    "lat": 20.311,
    "lon": 85.9711,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-05-03T17:49:24.541Z"
  },
  {
    "id": "r1032",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "High",
    "lat": 12.6848,
    "lon": 77.4258,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-22T13:44:24.541Z"
  },
  {
    "id": "r1033",
    "disease": "Tomato Leaf Curl",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 12.8315,
    "lon": 74.978,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-15T21:41:24.541Z"
  },
  {
    "id": "r1034",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "Medium",
    "lat": 25.902,
    "lon": 91.7015,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-28T08:12:24.541Z"
  },
  {
    "id": "r1035",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "High",
    "lat": 27.8105,
    "lon": 73.377,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-22T04:19:24.541Z"
  },
  {
    "id": "r1036",
    "disease": "Bacterial Blight",
    "crop": "Rice",
    "severity": "High",
    "lat": 17.9839,
    "lon": 79.2969,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-21T07:21:24.541Z"
  },
  {
    "id": "r1037",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "Low",
    "lat": 25.6145,
    "lon": 92.1849,
    "city": "Shillong",
    "state": "Meghalaya",
    "created_at": "2026-04-25T19:08:24.541Z"
  },
  {
    "id": "r1038",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 12.4437,
    "lon": 76.9012,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-19T05:59:24.541Z"
  },
  {
    "id": "r1039",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 17.9906,
    "lon": 79.8786,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-30T21:36:24.541Z"
  },
  {
    "id": "r1040",
    "disease": "Bitter Pit",
    "crop": "Apple",
    "severity": "Medium",
    "lat": 27.1205,
    "lon": 77.9216,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-13T14:36:24.541Z"
  },
  {
    "id": "r1041",
    "disease": "Tomato Leaf Curl",
    "crop": "Tomato",
    "severity": "High",
    "lat": 20.1097,
    "lon": 75.3309,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-23T22:38:24.541Z"
  },
  {
    "id": "r1042",
    "disease": "Powdery Mildew",
    "crop": "Apple",
    "severity": "Low",
    "lat": 27.1657,
    "lon": 75.8063,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-25T11:38:24.541Z"
  },
  {
    "id": "r1043",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "High",
    "lat": 31.3313,
    "lon": 77.1401,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-07T08:38:24.541Z"
  },
  {
    "id": "r1044",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "High",
    "lat": 18.8184,
    "lon": 78.1651,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-26T16:32:24.541Z"
  },
  {
    "id": "r1045",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 17.6909,
    "lon": 75.7429,
    "city": "Solapur",
    "state": "Maharashtra",
    "created_at": "2026-04-11T21:55:24.541Z"
  },
  {
    "id": "r1046",
    "disease": "Target Spot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 27.9277,
    "lon": 73.2742,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-13T10:44:24.541Z"
  },
  {
    "id": "r1047",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "High",
    "lat": 16.4367,
    "lon": 80.6208,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-27T12:14:24.541Z"
  },
  {
    "id": "r1048",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "High",
    "lat": 23.0087,
    "lon": 75.86,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-24T14:57:24.541Z"
  },
  {
    "id": "r1049",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 10.0276,
    "lon": 75.9999,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-05-01T19:17:24.541Z"
  },
  {
    "id": "r1050",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "High",
    "lat": 31.6216,
    "lon": 74.7095,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-05-05T03:24:24.541Z"
  },
  {
    "id": "r1051",
    "disease": "Tungro",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 26.9255,
    "lon": 83.222,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-10T09:55:24.541Z"
  },
  {
    "id": "r1052",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "High",
    "lat": 9.6728,
    "lon": 78.3147,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-09T04:59:24.541Z"
  },
  {
    "id": "r1053",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 11.0874,
    "lon": 78.8636,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-06T04:54:24.541Z"
  },
  {
    "id": "r1054",
    "disease": "Pokkah Boeng",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 21.4191,
    "lon": 78.8169,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-05-01T09:46:24.541Z"
  },
  {
    "id": "r1055",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 15.3843,
    "lon": 74.1199,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-15T08:55:24.541Z"
  },
  {
    "id": "r1056",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "High",
    "lat": 11.7468,
    "lon": 78.0552,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-26T16:40:24.541Z"
  },
  {
    "id": "r1057",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "High",
    "lat": 9.9158,
    "lon": 78.2875,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-24T21:44:24.541Z"
  },
  {
    "id": "r1058",
    "disease": "Leaf Rust",
    "crop": "Coffee",
    "severity": "High",
    "lat": 11.0715,
    "lon": 78.8433,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-29T02:26:24.541Z"
  },
  {
    "id": "r1059",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "High",
    "lat": 26.8585,
    "lon": 80.8356,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-23T21:25:24.541Z"
  },
  {
    "id": "r1060",
    "disease": "Sheath Blight",
    "crop": "Rice",
    "severity": "High",
    "lat": 25.1052,
    "lon": 75.8939,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-10T04:10:24.541Z"
  },
  {
    "id": "r1061",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 34.039,
    "lon": 75.0256,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-10T17:52:24.541Z"
  },
  {
    "id": "r1062",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "Low",
    "lat": 30.8118,
    "lon": 75.6269,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-23T16:25:24.541Z"
  },
  {
    "id": "r1063",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 26.0173,
    "lon": 91.4745,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-05-05T05:43:24.541Z"
  },
  {
    "id": "r1064",
    "disease": "Leaf Spot",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 13.2452,
    "lon": 80.3161,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-22T01:32:24.541Z"
  },
  {
    "id": "r1065",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 17.3846,
    "lon": 78.4697,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-07T23:23:24.541Z"
  },
  {
    "id": "r1066",
    "disease": "Pokkah Boeng",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 23.7679,
    "lon": 87.0236,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-26T12:46:24.541Z"
  },
  {
    "id": "r1067",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "High",
    "lat": 11.4428,
    "lon": 78.0944,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-10T05:51:24.541Z"
  },
  {
    "id": "r1068",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 17.661,
    "lon": 78.6745,
    "city": "Hyderabad",
    "state": "Telangana",
    "created_at": "2026-04-12T04:35:24.541Z"
  },
  {
    "id": "r1069",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 15.5668,
    "lon": 73.7166,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-23T22:38:24.541Z"
  },
  {
    "id": "r1070",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 18.2955,
    "lon": 73.6214,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-10T03:00:24.541Z"
  },
  {
    "id": "r1071",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 28.6596,
    "lon": 76.8522,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-27T23:43:24.541Z"
  },
  {
    "id": "r1072",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 17.7288,
    "lon": 79.3589,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-05-04T04:38:24.541Z"
  },
  {
    "id": "r1073",
    "disease": "Mosaic",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 25.3875,
    "lon": 84.9079,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-05-04T09:13:24.541Z"
  },
  {
    "id": "r1074",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 30.9392,
    "lon": 75.9329,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-13T10:19:24.541Z"
  },
  {
    "id": "r1075",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 18.743,
    "lon": 77.9175,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-18T00:36:24.541Z"
  },
  {
    "id": "r1076",
    "disease": "Common Rust",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 25.2623,
    "lon": 76.0006,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-28T10:22:24.541Z"
  },
  {
    "id": "r1077",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 10.986,
    "lon": 78.8821,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-05-02T17:34:24.541Z"
  },
  {
    "id": "r1078",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "High",
    "lat": 13.2134,
    "lon": 74.9829,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-11T16:56:24.541Z"
  },
  {
    "id": "r1079",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Low",
    "lat": 10.0802,
    "lon": 78.0809,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-07T23:37:24.541Z"
  },
  {
    "id": "r1080",
    "disease": "Leaf Rust",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 12.5415,
    "lon": 76.5981,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-08T03:16:24.541Z"
  },
  {
    "id": "r1081",
    "disease": "Early Blight",
    "crop": "Tomato",
    "severity": "Low",
    "lat": 19.0164,
    "lon": 72.6125,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-08T02:43:24.541Z"
  },
  {
    "id": "r1082",
    "disease": "Stripe Rust",
    "crop": "Wheat",
    "severity": "High",
    "lat": 24.9703,
    "lon": 84.8349,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-05-04T23:52:24.541Z"
  },
  {
    "id": "r1083",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "High",
    "lat": 18.0825,
    "lon": 79.6773,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-17T08:52:24.541Z"
  },
  {
    "id": "r1084",
    "disease": "Tungro",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 9.7458,
    "lon": 77.9008,
    "city": "Madurai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-27T05:32:24.541Z"
  },
  {
    "id": "r1085",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 11.608,
    "lon": 78.0698,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-28T17:51:24.541Z"
  },
  {
    "id": "r1086",
    "disease": "Apple Scab",
    "crop": "Apple",
    "severity": "High",
    "lat": 17.7118,
    "lon": 79.7741,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-16T03:20:24.541Z"
  },
  {
    "id": "r1087",
    "disease": "Cedar Apple Rust",
    "crop": "Apple",
    "severity": "Low",
    "lat": 21.0723,
    "lon": 78.8785,
    "city": "Nagpur",
    "state": "Maharashtra",
    "created_at": "2026-04-24T04:17:24.541Z"
  },
  {
    "id": "r1088",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 26.3203,
    "lon": 78.0711,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-26T05:29:24.541Z"
  },
  {
    "id": "r1089",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 12.9715,
    "lon": 80.3643,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-28T13:55:24.541Z"
  },
  {
    "id": "r1090",
    "disease": "Early Blight",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 22.6348,
    "lon": 75.6309,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-24T19:54:24.541Z"
  },
  {
    "id": "r1091",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "High",
    "lat": 18.5763,
    "lon": 73.5615,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-04-14T08:45:24.541Z"
  },
  {
    "id": "r1092",
    "disease": "Fusarium Wilt",
    "crop": "Tomato",
    "severity": "High",
    "lat": 16.5186,
    "lon": 80.5543,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-19T03:56:24.541Z"
  },
  {
    "id": "r1093",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 28.4107,
    "lon": 77.3158,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-05-02T06:55:24.541Z"
  },
  {
    "id": "r1094",
    "disease": "Pokkah Boeng",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 23.149,
    "lon": 80.2215,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-24T21:12:24.541Z"
  },
  {
    "id": "r1095",
    "disease": "Potato Virus Y",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 20.5308,
    "lon": 85.776,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-07T23:05:24.541Z"
  },
  {
    "id": "r1096",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 26.9148,
    "lon": 75.9746,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-05-05T00:07:24.541Z"
  },
  {
    "id": "r1097",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "High",
    "lat": 27.0608,
    "lon": 77.8303,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-01T07:42:24.541Z"
  },
  {
    "id": "r1098",
    "disease": "Melanose",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 22.3837,
    "lon": 88.54,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-18T09:29:24.541Z"
  },
  {
    "id": "r1099",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "Low",
    "lat": 26.7723,
    "lon": 75.6933,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-18T23:34:24.541Z"
  },
  {
    "id": "r1100",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "High",
    "lat": 26.5092,
    "lon": 77.8844,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-05T22:54:24.541Z"
  },
  {
    "id": "r1101",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 30.1141,
    "lon": 78.0799,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-05-05T10:37:24.541Z"
  },
  {
    "id": "r1102",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 18.5102,
    "lon": 77.9846,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-15T02:11:24.541Z"
  },
  {
    "id": "r1103",
    "disease": "Target Spot",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 23.3347,
    "lon": 75.9659,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-05T14:20:24.541Z"
  },
  {
    "id": "r1104",
    "disease": "Leaf Rust",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 18.7887,
    "lon": 77.955,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-12T14:40:24.541Z"
  },
  {
    "id": "r1105",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "High",
    "lat": 18.744,
    "lon": 77.9489,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-04-06T23:25:24.541Z"
  },
  {
    "id": "r1106",
    "disease": "Fire Blight",
    "crop": "Apple",
    "severity": "High",
    "lat": 13.1774,
    "lon": 80.4881,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-09T13:36:24.541Z"
  },
  {
    "id": "r1107",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "High",
    "lat": 29.1696,
    "lon": 76.3721,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-14T06:38:24.541Z"
  },
  {
    "id": "r1108",
    "disease": "Tomato Late Blight",
    "crop": "Tomato",
    "severity": "High",
    "lat": 10.5025,
    "lon": 78.8495,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-08T17:31:24.541Z"
  },
  {
    "id": "r1109",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 18.7584,
    "lon": 78.2938,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-05-04T20:12:24.541Z"
  },
  {
    "id": "r1110",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "High",
    "lat": 30.4414,
    "lon": 75.0522,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-06T13:08:24.541Z"
  },
  {
    "id": "r1111",
    "disease": "Blackleg",
    "crop": "Potato",
    "severity": "Low",
    "lat": 31.5939,
    "lon": 74.6351,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-17T22:10:24.541Z"
  },
  {
    "id": "r1112",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 20.1556,
    "lon": 75.2777,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-07T10:44:24.541Z"
  },
  {
    "id": "r1113",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 22.9546,
    "lon": 79.8871,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-28T05:06:24.541Z"
  },
  {
    "id": "r1114",
    "disease": "Grassy Shoot",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 25.8704,
    "lon": 91.622,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-23T12:35:24.541Z"
  },
  {
    "id": "r1115",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 12.2099,
    "lon": 76.6057,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-25T09:06:24.541Z"
  },
  {
    "id": "r1116",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "High",
    "lat": 26.155,
    "lon": 78.2435,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-29T00:38:24.541Z"
  },
  {
    "id": "r1117",
    "disease": "Target Spot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 18.2109,
    "lon": 79.5049,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-04-07T16:49:24.541Z"
  },
  {
    "id": "r1118",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Low",
    "lat": 27.1167,
    "lon": 78.1479,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-05-05T07:33:24.541Z"
  },
  {
    "id": "r1119",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 16.7566,
    "lon": 74.065,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-30T21:04:24.541Z"
  },
  {
    "id": "r1120",
    "disease": "Wilt",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 11.7184,
    "lon": 77.9874,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-08T16:39:24.541Z"
  },
  {
    "id": "r1121",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "High",
    "lat": 23.1055,
    "lon": 80.1005,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-27T01:45:24.541Z"
  },
  {
    "id": "r1122",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "High",
    "lat": 16.8515,
    "lon": 74.4822,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-17T04:27:24.541Z"
  },
  {
    "id": "r1123",
    "disease": "Grassy Shoot",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 24.5203,
    "lon": 84.7123,
    "city": "Gaya",
    "state": "Bihar",
    "created_at": "2026-04-23T01:40:24.541Z"
  },
  {
    "id": "r1124",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "High",
    "lat": 15.6516,
    "lon": 73.5865,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-25T19:05:24.541Z"
  },
  {
    "id": "r1125",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "High",
    "lat": 27.387,
    "lon": 77.7918,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-07T18:54:24.541Z"
  },
  {
    "id": "r1126",
    "disease": "Sheath Blight",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 26.834,
    "lon": 81.1874,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-25T20:35:24.541Z"
  },
  {
    "id": "r1127",
    "disease": "Downy Mildew",
    "crop": "Onion",
    "severity": "Low",
    "lat": 10.7486,
    "lon": 78.9339,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-10T20:08:24.541Z"
  },
  {
    "id": "r1128",
    "disease": "Malformation",
    "crop": "Mango",
    "severity": "Low",
    "lat": 22.414,
    "lon": 88.5891,
    "city": "Kolkata",
    "state": "West Bengal",
    "created_at": "2026-04-28T13:53:24.541Z"
  },
  {
    "id": "r1129",
    "disease": "Cotton Leaf Curl",
    "crop": "Cotton",
    "severity": "High",
    "lat": 27.2227,
    "lon": 77.8856,
    "city": "Agra",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-17T08:44:24.541Z"
  },
  {
    "id": "r1130",
    "disease": "Black Band",
    "crop": "Mango",
    "severity": "Medium",
    "lat": 10.8079,
    "lon": 78.4505,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-30T00:57:24.541Z"
  },
  {
    "id": "r1131",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "High",
    "lat": 26.9955,
    "lon": 88.2398,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-10T23:46:24.541Z"
  },
  {
    "id": "r1132",
    "disease": "Gray Leaf Spot",
    "crop": "Maize",
    "severity": "Low",
    "lat": 34.2738,
    "lon": 74.9673,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-21T20:04:24.541Z"
  },
  {
    "id": "r1133",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 25.9509,
    "lon": 78.3182,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-26T05:03:24.541Z"
  },
  {
    "id": "r1134",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 10.079,
    "lon": 76.1993,
    "city": "Kochi",
    "state": "Kerala",
    "created_at": "2026-05-04T23:49:24.541Z"
  },
  {
    "id": "r1135",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 13.0955,
    "lon": 80.2375,
    "city": "Chennai",
    "state": "Tamil Nadu",
    "created_at": "2026-04-14T12:43:24.541Z"
  },
  {
    "id": "r1136",
    "disease": "Botrytis Blight",
    "crop": "Onion",
    "severity": "High",
    "lat": 31.9331,
    "lon": 74.6494,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-15T14:45:24.541Z"
  },
  {
    "id": "r1137",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 18.8327,
    "lon": 77.9984,
    "city": "Nizamabad",
    "state": "Telangana",
    "created_at": "2026-05-02T16:11:24.541Z"
  },
  {
    "id": "r1138",
    "disease": "Grassy Shoot",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 32.9152,
    "lon": 74.7674,
    "city": "Jammu",
    "state": "J&K",
    "created_at": "2026-04-11T20:44:24.541Z"
  },
  {
    "id": "r1139",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 30.7438,
    "lon": 75.8012,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-14T18:17:24.541Z"
  },
  {
    "id": "r1140",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "Low",
    "lat": 10.8095,
    "lon": 78.9992,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-04-21T07:01:24.541Z"
  },
  {
    "id": "r1141",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 30.2173,
    "lon": 75.0442,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-11T18:38:24.541Z"
  },
  {
    "id": "r1142",
    "disease": "Downy Mildew",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 19.3707,
    "lon": 72.8398,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-21T21:03:24.541Z"
  },
  {
    "id": "r1143",
    "disease": "Maize Downy Mildew",
    "crop": "Maize",
    "severity": "High",
    "lat": 25.3237,
    "lon": 85.3629,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-05-03T07:57:24.541Z"
  },
  {
    "id": "r1144",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "Low",
    "lat": 28.7495,
    "lon": 76.6721,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-05-01T19:34:24.541Z"
  },
  {
    "id": "r1145",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 30.8435,
    "lon": 76.9999,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-04-11T04:46:24.541Z"
  },
  {
    "id": "r1146",
    "disease": "Common Smut",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 34.0324,
    "lon": 74.8408,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-11T02:44:24.541Z"
  },
  {
    "id": "r1147",
    "disease": "Rice Blast",
    "crop": "Rice",
    "severity": "High",
    "lat": 23.1044,
    "lon": 75.6072,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-23T20:58:24.541Z"
  },
  {
    "id": "r1148",
    "disease": "Onion Smut",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 26.7786,
    "lon": 88.1801,
    "city": "Siliguri",
    "state": "West Bengal",
    "created_at": "2026-04-28T23:10:24.541Z"
  },
  {
    "id": "r1149",
    "disease": "Tomato Late Blight",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 15.3881,
    "lon": 73.783,
    "city": "Goa",
    "state": "Goa",
    "created_at": "2026-04-16T00:37:24.541Z"
  },
  {
    "id": "r1150",
    "disease": "Berry Disease",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 31.3687,
    "lon": 77.1635,
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "created_at": "2026-05-05T02:35:24.541Z"
  },
  {
    "id": "r1151",
    "disease": "Fusarium Head Blight",
    "crop": "Wheat",
    "severity": "Low",
    "lat": 34.1922,
    "lon": 74.553,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-24T09:48:24.541Z"
  },
  {
    "id": "r1152",
    "disease": "Pokkah Boeng",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 31.4635,
    "lon": 74.7342,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-05-02T23:51:24.541Z"
  },
  {
    "id": "r1153",
    "disease": "Black Sigatoka",
    "crop": "Banana",
    "severity": "Low",
    "lat": 33.8353,
    "lon": 74.7519,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-17T04:46:24.541Z"
  },
  {
    "id": "r1154",
    "disease": "Greening",
    "crop": "Citrus",
    "severity": "High",
    "lat": 30.4584,
    "lon": 74.738,
    "city": "Bhatinda",
    "state": "Punjab",
    "created_at": "2026-04-13T16:48:24.541Z"
  },
  {
    "id": "r1155",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "Medium",
    "lat": 29.881,
    "lon": 77.3916,
    "city": "Saharanpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-27T22:08:24.541Z"
  },
  {
    "id": "r1156",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "High",
    "lat": 10.7494,
    "lon": 78.4692,
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "created_at": "2026-05-02T20:25:24.541Z"
  },
  {
    "id": "r1157",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Medium",
    "lat": 25.3647,
    "lon": 85.4086,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-05-04T11:07:24.541Z"
  },
  {
    "id": "r1158",
    "disease": "Purple Blotch",
    "crop": "Onion",
    "severity": "Medium",
    "lat": 19.3137,
    "lon": 72.871,
    "city": "Mumbai",
    "state": "Maharashtra",
    "created_at": "2026-04-30T19:51:24.541Z"
  },
  {
    "id": "r1159",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "High",
    "lat": 25.0085,
    "lon": 75.9687,
    "city": "Kota",
    "state": "Rajasthan",
    "created_at": "2026-04-23T02:26:24.541Z"
  },
  {
    "id": "r1160",
    "disease": "Esca",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 26.6825,
    "lon": 83.1192,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-11T13:28:24.541Z"
  },
  {
    "id": "r1161",
    "disease": "Black Rot",
    "crop": "Grapes",
    "severity": "Medium",
    "lat": 26.502,
    "lon": 78.201,
    "city": "Gwalior",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-29T15:32:24.541Z"
  },
  {
    "id": "r1162",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "High",
    "lat": 27.8137,
    "lon": 73.1901,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-26T09:23:24.541Z"
  },
  {
    "id": "r1163",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 30.8045,
    "lon": 76.0787,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-20T05:19:24.541Z"
  },
  {
    "id": "r1164",
    "disease": "Gray Leaf Spot",
    "crop": "Maize",
    "severity": "Medium",
    "lat": 26.6185,
    "lon": 81.0398,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-08T03:29:24.541Z"
  },
  {
    "id": "r1165",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "High",
    "lat": 28.9691,
    "lon": 77.2459,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-04-14T18:41:24.541Z"
  },
  {
    "id": "r1166",
    "disease": "Anthracnose",
    "crop": "Mango",
    "severity": "Low",
    "lat": 22.6114,
    "lon": 75.9114,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-08T04:52:24.541Z"
  },
  {
    "id": "r1167",
    "disease": "Early Blight",
    "crop": "Tomato",
    "severity": "High",
    "lat": 28.5972,
    "lon": 76.3287,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-04-09T10:23:24.541Z"
  },
  {
    "id": "r1168",
    "disease": "Cotton Bollworm",
    "crop": "Cotton",
    "severity": "Low",
    "lat": 23.1919,
    "lon": 75.7628,
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-06T21:18:24.541Z"
  },
  {
    "id": "r1169",
    "disease": "Bacterial Canker",
    "crop": "Mango",
    "severity": "High",
    "lat": 27.9912,
    "lon": 73.2946,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-12T02:11:24.541Z"
  },
  {
    "id": "r1170",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "High",
    "lat": 31.366,
    "lon": 75.0221,
    "city": "Amritsar",
    "state": "Punjab",
    "created_at": "2026-04-20T04:45:24.541Z"
  },
  {
    "id": "r1171",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "High",
    "lat": 18.2347,
    "lon": 79.6072,
    "city": "Warangal",
    "state": "Telangana",
    "created_at": "2026-05-01T15:57:24.541Z"
  },
  {
    "id": "r1172",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "High",
    "lat": 20.0754,
    "lon": 75.116,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-10T00:17:24.541Z"
  },
  {
    "id": "r1173",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "Low",
    "lat": 28.523,
    "lon": 77.1804,
    "city": "Delhi",
    "state": "Delhi",
    "created_at": "2026-04-29T12:15:24.541Z"
  },
  {
    "id": "r1174",
    "disease": "Powdery Mildew",
    "crop": "Grapes",
    "severity": "Low",
    "lat": 26.2144,
    "lon": 91.8548,
    "city": "Guwahati",
    "state": "Assam",
    "created_at": "2026-04-07T03:11:24.541Z"
  },
  {
    "id": "r1175",
    "disease": "Silver Scurf",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 20.0664,
    "lon": 85.9288,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-30T16:18:24.541Z"
  },
  {
    "id": "r1176",
    "disease": "Powdery Mildew",
    "crop": "Mango",
    "severity": "Low",
    "lat": 19.7431,
    "lon": 75.1067,
    "city": "Aurangabad",
    "state": "Maharashtra",
    "created_at": "2026-04-07T14:30:24.541Z"
  },
  {
    "id": "r1177",
    "disease": "Cercospora Leaf Spot",
    "crop": "Coffee",
    "severity": "Low",
    "lat": 34.2006,
    "lon": 74.9353,
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "created_at": "2026-04-29T11:51:24.541Z"
  },
  {
    "id": "r1178",
    "disease": "Black Spot",
    "crop": "Citrus",
    "severity": "Low",
    "lat": 30.9046,
    "lon": 75.6722,
    "city": "Ludhiana",
    "state": "Punjab",
    "created_at": "2026-04-19T17:17:24.541Z"
  },
  {
    "id": "r1179",
    "disease": "Common Scab",
    "crop": "Potato",
    "severity": "Low",
    "lat": 11.4349,
    "lon": 77.8857,
    "city": "Salem",
    "state": "Tamil Nadu",
    "created_at": "2026-04-05T21:37:24.541Z"
  },
  {
    "id": "r1180",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "Low",
    "lat": 26.7213,
    "lon": 83.5891,
    "city": "Gorakhpur",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-20T03:08:24.541Z"
  },
  {
    "id": "r1181",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "Medium",
    "lat": 27.1285,
    "lon": 75.7143,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-22T02:05:24.541Z"
  },
  {
    "id": "r1182",
    "disease": "Bunchy Top Virus",
    "crop": "Banana",
    "severity": "Low",
    "lat": 25.4458,
    "lon": 84.9497,
    "city": "Patna",
    "state": "Bihar",
    "created_at": "2026-04-15T07:16:24.541Z"
  },
  {
    "id": "r1183",
    "disease": "Bacterial Blight",
    "crop": "Rice",
    "severity": "Medium",
    "lat": 26.7525,
    "lon": 76.0806,
    "city": "Jaipur",
    "state": "Rajasthan",
    "created_at": "2026-04-13T18:34:24.541Z"
  },
  {
    "id": "r1184",
    "disease": "Bacterial Spot",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 30.5272,
    "lon": 78.1814,
    "city": "Dehradun",
    "state": "Uttarakhand",
    "created_at": "2026-05-01T22:58:24.541Z"
  },
  {
    "id": "r1185",
    "disease": "Northern Corn Leaf Blight",
    "crop": "Maize",
    "severity": "Low",
    "lat": 27.8525,
    "lon": 73.2477,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-17T10:17:24.541Z"
  },
  {
    "id": "r1186",
    "disease": "False Smut",
    "crop": "Rice",
    "severity": "High",
    "lat": 16.6743,
    "lon": 73.9936,
    "city": "Kolhapur",
    "state": "Maharashtra",
    "created_at": "2026-04-22T15:17:24.541Z"
  },
  {
    "id": "r1187",
    "disease": "Bacterial Blight",
    "crop": "Rice",
    "severity": "Low",
    "lat": 18.6253,
    "lon": 73.7435,
    "city": "Pune",
    "state": "Maharashtra",
    "created_at": "2026-05-01T23:09:24.541Z"
  },
  {
    "id": "r1188",
    "disease": "Potato Late Blight",
    "crop": "Potato",
    "severity": "Low",
    "lat": 23.7727,
    "lon": 87.1275,
    "city": "Asansol",
    "state": "West Bengal",
    "created_at": "2026-04-21T23:05:24.541Z"
  },
  {
    "id": "r1189",
    "disease": "Red Rust",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 22.4894,
    "lon": 75.7174,
    "city": "Indore",
    "state": "Madhya Pradesh",
    "created_at": "2026-05-02T19:13:24.541Z"
  },
  {
    "id": "r1190",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "High",
    "lat": 23.4368,
    "lon": 79.8714,
    "city": "Jabalpur",
    "state": "Madhya Pradesh",
    "created_at": "2026-04-17T17:30:24.541Z"
  },
  {
    "id": "r1191",
    "disease": "Tristeza",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 27.7359,
    "lon": 73.2798,
    "city": "Bikaner",
    "state": "Rajasthan",
    "created_at": "2026-04-07T03:19:24.541Z"
  },
  {
    "id": "r1192",
    "disease": "Red Rot",
    "crop": "Sugarcane",
    "severity": "Low",
    "lat": 12.6814,
    "lon": 74.7571,
    "city": "Mangalore",
    "state": "Karnataka",
    "created_at": "2026-04-24T03:32:24.541Z"
  },
  {
    "id": "r1193",
    "disease": "Brown Spot",
    "crop": "Rice",
    "severity": "Low",
    "lat": 12.5477,
    "lon": 76.6676,
    "city": "Mysore",
    "state": "Karnataka",
    "created_at": "2026-04-23T12:33:24.541Z"
  },
  {
    "id": "r1194",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "Medium",
    "lat": 26.8964,
    "lon": 80.9227,
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "created_at": "2026-04-06T12:00:24.541Z"
  },
  {
    "id": "r1195",
    "disease": "Septoria Leaf Spot",
    "crop": "Tomato",
    "severity": "Medium",
    "lat": 20.4774,
    "lon": 85.7068,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-04-08T19:45:24.541Z"
  },
  {
    "id": "r1196",
    "disease": "Wheat Rust",
    "crop": "Wheat",
    "severity": "Medium",
    "lat": 20.5608,
    "lon": 86.0926,
    "city": "Bhubaneswar",
    "state": "Odisha",
    "created_at": "2026-05-02T02:52:24.541Z"
  },
  {
    "id": "r1197",
    "disease": "Boll Rot",
    "crop": "Cotton",
    "severity": "Medium",
    "lat": 12.826,
    "lon": 77.4768,
    "city": "Bengaluru",
    "state": "Karnataka",
    "created_at": "2026-04-28T13:18:24.541Z"
  },
  {
    "id": "r1198",
    "disease": "Mosquito Bug",
    "crop": "Tea",
    "severity": "High",
    "lat": 16.0892,
    "lon": 80.4128,
    "city": "Guntur",
    "state": "Andhra Pradesh",
    "created_at": "2026-04-28T11:28:24.541Z"
  },
  {
    "id": "r1199",
    "disease": "Citrus Canker",
    "crop": "Citrus",
    "severity": "Medium",
    "lat": 28.7476,
    "lon": 76.3363,
    "city": "Rohtak",
    "state": "Haryana",
    "created_at": "2026-05-01T07:47:24.541Z"
  }
];
const CROPS = ["All", "Rice", "Wheat", "Tomato", "Potato", "Corn", "Citrus", "Fruit", "Vegetable"];
const TIME_RANGES = ["All Time", "Last 7 Days", "Last 30 Days"];
function HeatmapPage() {
  const [analyses, setAnalyses] = useState(() => {
    const localData = JSON.parse(localStorage.getItem("communityAnalyses") || "[]");
    return [...localData, ...MOCK_DATA];
  });
  const [filteredCrop, setFilteredCrop] = useState("All");
  const [timeRange, setTimeRange] = useState("All Time");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchFilter, setActiveSearchFilter] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const heatLayerRef = useRef(null);
  useEffect(() => {
    fetchAnalyses();
  }, []);
  const fetchAnalyses = async () => {
    try {
      const {
        data,
        error: supabaseError
      } = await supabase.from("analyses").select("id, disease, crop, severity, lat, lon, city, state, created_at").order("created_at", {
        ascending: false
      }).limit(200);
      if (data && data.length > 0) {
        setAnalyses((prev) => {
          const combined = [...prev, ...data];
          return Array.from(new Map(combined.map((a) => [a.id, a])).values());
        });
      }
    } catch (err) {
      console.warn("Background fetch failed, using local/mock data.");
    }
  };
  const filteredAnalyses = useMemo(() => {
    const forbidden = ["Islamabad", "Lahore", "Karachi", "Dhaka", "Colombo", "Kathmandu"];
    return analyses.filter((a) => {
      if (forbidden.includes(a.city)) return false;
      let cropMatch = filteredCrop === "All" || a.crop === filteredCrop;
      if (filteredCrop === "Fruit") {
        cropMatch = ["Apple", "Mango", "Grapes", "Banana", "Citrus", "Orange"].includes(a.crop);
      } else if (filteredCrop === "Vegetable") {
        cropMatch = ["Tomato", "Potato", "Onion", "Cabbage", "Cucumber", "Pepper"].includes(a.crop);
      }
      let timeMatch = true;
      const date = new Date(a.created_at).getTime();
      const now = Date.now();
      if (timeRange === "Last 7 Days") {
        timeMatch = date > now - 7 * 24 * 60 * 60 * 1e3;
      } else if (timeRange === "Last 30 Days") {
        timeMatch = date > now - 30 * 24 * 60 * 60 * 1e3;
      }
      let searchMatch = true;
      if (activeSearchFilter) {
        searchMatch = a.city.toLowerCase().includes(activeSearchFilter.toLowerCase()) || a.state.toLowerCase().includes(activeSearchFilter.toLowerCase());
      }
      return cropMatch && timeMatch && searchMatch;
    });
  }, [analyses, filteredCrop, timeRange, activeSearchFilter]);
  const stats = useMemo(() => {
    const high = filteredAnalyses.filter((a) => a.severity === "High").length;
    const medium = filteredAnalyses.filter((a) => a.severity === "Medium").length;
    const low = filteredAnalyses.filter((a) => a.severity === "Low").length;
    const total = filteredAnalyses.length || 1;
    return {
      high,
      medium,
      low,
      highPct: high / total * 100,
      mediumPct: medium / total * 100,
      lowPct: low / total * 100
    };
  }, [filteredAnalyses]);
  const markersRef = useRef(null);
  useEffect(() => {
    if (loading || !mapContainerRef.current) return;
    let resizeObserver = null;
    const initMap = () => {
      const L = window.L;
      if (!L || !L.heatLayer || !L.markerClusterGroup) {
        console.log("LEAFLET_RETRY: Scripts not ready yet...");
        const timer = setTimeout(initMap, 300);
        return () => clearTimeout(timer);
      }
      if (mapRef.current) {
        try {
          mapRef.current.remove();
          mapRef.current = null;
        } catch (e) {
          console.warn("LEAFLET_CLEANUP_WARN:", e);
        }
      }
      try {
        const sw = L.latLng(6, 68);
        const ne = L.latLng(38, 98);
        const bounds = L.latLngBounds(sw, ne);
        const m = L.map(mapContainerRef.current, {
          center: [22.5, 82.9],
          zoom: 5,
          minZoom: 5,
          maxZoom: 10,
          zoomControl: false,
          maxBounds: bounds,
          maxBoundsViscosity: 1,
          preferCanvas: true,
          updateWhenIdle: true,
          // Performance boost
          updateWhenZooming: false
          // Smoother zoom
        });
        mapRef.current = m;
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
          attribution: "© CARTO"
        }).addTo(m);
        const worldCoords = [[-90, -180], [-90, 180], [90, 180], [90, -180], [-90, -180]];
        const indiaHole = [[37.5, 68], [37.5, 97], [8, 97], [8, 68], [37.5, 68]];
        L.polygon([worldCoords, indiaHole], {
          color: "#000",
          weight: 0,
          fillColor: "#000",
          fillOpacity: 0.25,
          interactive: false
        }).addTo(m);
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png", {
          opacity: 0.8
        }).addTo(m);
        L.control.zoom({
          position: "bottomright"
        }).addTo(m);
        markersRef.current = L.markerClusterGroup({
          showCoverageOnHover: false,
          spiderfyOnMaxZoom: true,
          maxClusterRadius: 40,
          iconCreateFunction: (cluster) => {
            const count = cluster.getChildCount();
            return L.divIcon({
              html: `<div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/90 text-white font-black text-xs shadow-lg border-2 border-white backdrop-blur-sm">${count}</div>`,
              className: "custom-cluster-icon",
              iconSize: L.point(40, 40)
            });
          }
        }).addTo(m);
        resizeObserver = new ResizeObserver(() => {
          if (mapRef.current) {
            mapRef.current.invalidateSize();
          }
        });
        resizeObserver.observe(mapContainerRef.current);
        setTimeout(() => {
          m.invalidateSize();
        }, 100);
        updateHeatmap();
      } catch (err) {
        console.error("LEAFLET_INIT_ERROR:", err);
      }
    };
    const cleanup = initMap();
    return () => {
      if (typeof cleanup === "function") cleanup();
      if (resizeObserver) resizeObserver.disconnect();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [loading]);
  const updateHeatmap = () => {
    const L = window.L;
    if (!L || !mapRef.current || !markersRef.current) return;
    if (heatLayerRef.current) {
      mapRef.current.removeLayer(heatLayerRef.current);
    }
    const heatPoints = filteredAnalyses.filter((a) => a.lat && a.lon).map((a) => [a.lat, a.lon, a.severity === "High" ? 1 : a.severity === "Medium" ? 0.7 : 0.4]);
    if (L.heatLayer) {
      heatLayerRef.current = L.heatLayer(heatPoints, {
        radius: 25,
        blur: 15,
        maxZoom: 10,
        gradient: {
          0.2: "#10b981",
          0.6: "#f59e0b",
          1: "#ef4444"
        }
      }).addTo(mapRef.current);
    }
    markersRef.current.clearLayers();
    const newMarkers = filteredAnalyses.map((a) => {
      const isReal = a.isRealtime;
      const color = a.severity === "High" ? "#ef4444" : a.severity === "Medium" ? "#f59e0b" : "#10b981";
      if (isReal) {
        return L.marker([a.lat, a.lon], {
          icon: L.divIcon({
            html: `
              <div class="relative">
                <div class="absolute -inset-2 rounded-full bg-primary/40 animate-ping"></div>
                <div class="relative w-4 h-4 rounded-full border-2 border-white shadow-md bg-primary"></div>
              </div>
            `,
            className: "realtime-pulse-icon",
            iconSize: [16, 16]
          })
        }).bindPopup(`<strong>Live Detection: ${a.disease}</strong><br/>Detected just now in ${a.city}`);
      }
      const marker = L.circleMarker([a.lat, a.lon], {
        radius: 7,
        fillColor: color,
        color: "#fff",
        weight: 1.5,
        fillOpacity: 0.9
      });
      marker.bindPopup(`
        <div class="p-4 min-w-[220px] font-sans">
          <div class="flex items-center gap-3 mb-3">
            <div class="h-2.5 w-2.5 rounded-full ${a.severity === "High" ? "bg-red-500 shadow-red-200" : a.severity === "Medium" ? "bg-amber-500 shadow-amber-200" : "bg-emerald-500 shadow-emerald-200"} shadow-lg animate-pulse"></div>
            <h3 class="font-black text-gray-900 leading-tight">${a.disease}</h3>
          </div>
          <div class="grid grid-cols-2 gap-y-2 border-t border-gray-100 pt-3 text-[11px]">
            <span class="text-gray-400 font-bold uppercase tracking-tighter">Crop</span>
            <span class="font-black text-right text-primary">${a.crop}</span>
            <span class="text-gray-400 font-bold uppercase tracking-tighter">Location</span>
            <span class="font-black text-right truncate pl-2">${a.city}</span>
            <span class="text-gray-400 font-bold uppercase tracking-tighter">Reported</span>
            <span class="font-black text-right text-gray-400 italic">${formatDistanceToNow(new Date(a.created_at))} ago</span>
          </div>
          <button class="w-full mt-4 py-2 bg-primary text-white text-[10px] font-black rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">Full Diagnosis</button>
        </div>
      `, {
        closeButton: false,
        className: "custom-popup"
      });
      return marker;
    });
    setTimeout(() => {
      if (markersRef.current) {
        markersRef.current.addLayers(newMarkers);
      }
    }, 0);
  };
  useEffect(() => {
    updateHeatmap();
  }, [filteredAnalyses]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setActiveSearchFilter(null);
      if (mapRef.current) {
        mapRef.current.flyTo([22.5, 82.9], 5);
      }
      return;
    }
    const match = analyses.find((a) => a.city.toLowerCase().includes(searchQuery.toLowerCase()) || a.state.toLowerCase().includes(searchQuery.toLowerCase()));
    setActiveSearchFilter(searchQuery);
    if (match && mapRef.current) {
      mapRef.current.flyTo([match.lat, match.lon], 10);
    }
  };
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        if (mapRef.current) {
          mapRef.current.flyTo([pos.coords.latitude, pos.coords.longitude], 8);
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex h-[calc(100vh-64px)] flex-col bg-[#fefae0]/10 overflow-hidden font-sans", children: [
    /* @__PURE__ */ jsxs("div", { className: "z-20 bg-white border-b border-border/50 px-6 py-4 shadow-sm flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-primary shadow-lg shadow-primary/20 p-2.5 rounded-2xl text-white", children: /* @__PURE__ */ jsx(Map$1, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black tracking-tight font-display text-gray-900 leading-tight", children: "CropWatch" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-2 w-2 rounded-full bg-emerald-500" }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-muted-foreground uppercase tracking-wider", children: "India Live Data Feed" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "relative group hidden sm:block", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search city or state...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all w-64 font-medium" })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: handleLocateMe, className: "p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-gray-600 shadow-sm", children: /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative bg-gray-100", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 z-[400] space-y-4 w-full max-w-[calc(100%-32px)]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white/90 backdrop-blur-md p-1 rounded-2xl shadow-xl border border-white flex gap-1", children: CROPS.map((crop) => /* @__PURE__ */ jsx("button", { onClick: () => setFilteredCrop(crop), className: `px-4 py-2 rounded-xl text-xs font-bold transition-all ${filteredCrop === crop ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-gray-600 hover:bg-gray-100"}`, children: crop }, crop)) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white/90 backdrop-blur-md p-1 rounded-2xl shadow-xl border border-white flex gap-1", children: TIME_RANGES.map((range) => /* @__PURE__ */ jsx("button", { onClick: () => setTimeRange(range), className: `px-4 py-2 rounded-xl text-xs font-bold transition-all ${timeRange === range ? "bg-gray-800 text-white" : "text-gray-500 hover:bg-gray-100"}`, children: range }, range)) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { ref: mapContainerRef, className: "h-full w-full z-0" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 left-6 z-[400] bg-white/90 backdrop-blur-md border border-white/50 p-4 rounded-3xl shadow-2xl min-w-[160px]", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-3", children: "Intensity Scale" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-200" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-700", children: "High Risk" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded", children: stats.high })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full bg-amber-500 shadow-lg shadow-amber-200" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-700", children: "Medium" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded", children: stats.medium })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-700", children: "Low Risk" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded", children: stats.low })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-3 border-t border-gray-100", children: [
            /* @__PURE__ */ jsxs("div", { className: "h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex", children: [
              /* @__PURE__ */ jsx("div", { style: {
                width: `${stats.highPct}%`
              }, className: "bg-red-500 h-full" }),
              /* @__PURE__ */ jsx("div", { style: {
                width: `${stats.mediumPct}%`
              }, className: "bg-amber-500 h-full" }),
              /* @__PURE__ */ jsx("div", { style: {
                width: `${stats.lowPct}%`
              }, className: "bg-emerald-500 h-full" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[9px] text-gray-400 mt-2 font-bold text-center uppercase tracking-tight", children: "Community Severity Mix" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden xl:flex w-[380px] flex-col bg-white border-l border-border/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-border/50 bg-gray-50/30", children: [
          /* @__PURE__ */ jsxs("h2", { className: "font-black text-lg flex items-center gap-2.5 text-gray-900", children: [
            /* @__PURE__ */ jsx("div", { className: "p-1.5 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-primary" }) }),
            activeSearchFilter ? `Outbreaks in ${activeSearchFilter}` : "Latest Outbreaks"
          ] }),
          activeSearchFilter && /* @__PURE__ */ jsx("button", { onClick: () => {
            setActiveSearchFilter(null);
            setSearchQuery("");
            if (mapRef.current) mapRef.current.flyTo([22.5, 82.9], 5);
          }, className: "mt-2 text-[10px] font-bold text-primary hover:underline uppercase tracking-tight", children: "✕ Clear regional filter" }),
          error && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-2 text-amber-800 text-[11px] font-bold", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4 flex-none" }),
            error
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar", children: filteredAnalyses.length > 0 ? filteredAnalyses.map((a) => /* @__PURE__ */ jsxs("div", { className: "group relative p-5 rounded-[2rem] border border-gray-100 bg-white hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer", onClick: () => {
          if (mapRef.current && a.lat && a.lon) {
            mapRef.current.flyTo([a.lat, a.lon], 12);
          }
        }, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxs("span", { className: `text-[9px] w-fit uppercase tracking-widest font-black px-2.5 py-1 rounded-full mb-2 ${a.severity === "High" ? "bg-red-100 text-red-600" : a.severity === "Medium" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"}`, children: [
                a.severity,
                " Severity"
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "font-black text-gray-900 group-hover:text-primary transition-colors text-base", children: a.disease })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-2 rounded-2xl text-[10px] font-black text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors", children: a.crop })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-50", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[11px] font-bold text-gray-500", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 text-gray-300" }),
              /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
                a.city,
                ", ",
                a.state
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 text-[11px] font-bold text-gray-400", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5 text-gray-300" }),
              formatDistanceToNow(new Date(a.created_at), {
                addSuffix: true
              })
            ] })
          ] })
        ] }, a.id)) : /* @__PURE__ */ jsxs("div", { className: "text-center py-20", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gray-50 rounded-[3rem] h-20 w-20 flex items-center justify-center mx-auto mb-6 text-gray-200", children: /* @__PURE__ */ jsx(Search, { className: "h-10 w-10" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-black text-gray-900", children: "No outbreaks found" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-2 font-medium px-10 leading-relaxed", children: "Try adjusting your filters or time range to see community reports." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "p-6 bg-white border-t border-border/50", children: /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[2rem] bg-primary/5 border border-primary/10", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-primary mb-1", children: "Community Activity" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xl font-black text-gray-900", children: [
            analyses.length,
            " Active Reports"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-500 mt-1 font-bold italic", children: "Helping farmers across India stay informed." })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .leaflet-container { background: #f8fafc !important; }
        .custom-popup .leaflet-popup-content-wrapper { 
          border-radius: 1.5rem; 
          padding: 0; 
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }
        .custom-popup .leaflet-popup-content { margin: 0; }
        .custom-popup .leaflet-popup-tip { display: none; }
      ` })
  ] });
}
export {
  HeatmapPage as component
};
