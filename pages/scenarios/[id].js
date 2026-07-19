// pages/scenarios/[id]/index.js
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from "../../../components/Navbar";

export default function ScenarioDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  const [currentMainStep, setCurrentMainStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0);

  const mainSteps = ["مقابلة العمل", "تنفيذ التصميم", "تسليم المشروع"];
  const subSteps = ["تحديد الاحتياجات", "المفاوضة على السعر", "تحديد آليات الدفع والتسليم"];

  const scenarios = {
    cafe: {
      title: 'ملف العميل',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop&q=80',
      clientName: 'أبو أحمد',
      role: 'صاحب المقهى',
      difficulty: 'سهل',
      projectLabel: 'تصميم شبكة مقهى كوفي شوب ☕',
      description: 'صاحب مقهى يطلب منك تصميم شبكة لـ 50 زبون يومياً + كاشير + مكاتب إدارة.',
     
