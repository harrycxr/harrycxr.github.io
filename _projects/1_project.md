---
layout: page
title: Polar Sea Ice Sensing & Dynamic Path Planning
description: Multi-source sea ice attitude fusion sensing and ship path dynamic planning for polar navigation.
img: assets/img/projects/polar_ice.jpg
importance: 1
category: Academic Research
related_publications: false
---

### Project Overview
Supported by the **Open Project of the State Key Laboratory of Water Transport Control** (水路交通控制全国重点实验室开放课题, Grant No. `W26CG000063`, 2026.01 – 2027.12).

### Background & Challenges
Navigating through polar sea ice poses extreme challenges due to severe environmental disturbances, complex sub-ice acoustic reverberation, and highly non-Gaussian, nonlinear hydrodynamic interactions. Safe navigation requires high-precision situational awareness and real-time obstacle-avoidance trajectory planning.

### Key Innovations & Methodology
1. **Sub-Ice Acoustic Sensing Architecture**:
   - Designed and evaluated an acoustic sensing scheme specifically tailored for harsh sub-ice polar environments.
2. **Spatio-Temporal Trajectory Tracking on Manifolds**:
   - Established state-space models capturing both target kinematic and hydrodynamic features.
   - Employed an **Error-State Unscented Kalman Filter on Manifolds (ESUKF-M)** integrated with adaptive resampling, utilizing exponential and logarithmic mappings between Riemannian manifolds and local tangent spaces to eliminate particle degeneracy in non-Gaussian regimes.
3. **Dynamic Path Planning & Control**:
   - Built environmental prior grid maps and extracted obstacle boundaries via **Hough transform**.
   - Developed an improved bidirectional A* search algorithm incorporating an adaptive smoothing factor to optimize heading continuity.
   - Coupled the planned waypoints with **Model Predictive Control (MPC)** to ensure robust and fuel-efficient trajectory tracking amidst drift and ice resistance.
