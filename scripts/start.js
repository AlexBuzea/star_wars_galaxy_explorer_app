#!/usr/bin/env node

import { spawn } from 'child_process';

console.log('\n🌟 ============================================ 🌟');
console.log('🚀  STAR WARS GALAXY EXPLORER IS STARTING! 🚀');
console.log('🌟 ============================================ 🌟');
console.log('⏳  Initializing the Force...');
console.log('🔧  Building lightsabers...');
console.log('🚀  Preparing hyperspace jump...');
console.log('🌟 ============================================ 🌟\n');

const vite = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true
});

vite.on('close', (code) => {
  if (code !== 0) {
    console.log('\n❌ The Death Star has interfered with the launch!');
    console.log(`Process exited with code ${code}`);
  }
});

// Display port info after a short delay
setTimeout(() => {
  console.log('\n🌟 ============================================ 🌟');
  console.log('✅  STAR WARS GALAXY EXPLORER IS READY!  ✅');
  console.log('🌟 ============================================ 🌟');
  console.log('📍  Local:    http://localhost:5173/');
  console.log('🌐  Network:  use --host to expose');
  console.log('🌟 ============================================ 🌟');
  console.log('✨  May the Force be with you! ✨');
  console.log('🌟 ============================================ 🌟\n');
}, 2000);