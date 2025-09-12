import React from 'react'
import AliveScreen from '../screens/AliveScreen'
import { Routes, Route } from 'react-router-dom';
import RetriesScreen from '../screens/RetriesScreen';
import DeadScreen from '../screens/DeadScreen'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AliveScreen />} />
            <Route path="/retries" element={<RetriesScreen />} />
            <Route path="/dead" element={<DeadScreen />} />
        </Routes>
    )
}
