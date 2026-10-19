---
layout: page
title: Marine Sensor Network Resource Localization & Acquisition
description: Ray acoustics sound-speed refraction compensation and Riemannian Covariance Intersection fusion.
img: assets/img/projects/ray_acoustics.jpg
importance: 3
category: Academic Research
related_publications: true
---

### Project Overview
Supported by the **Shanghai "Chenguang Program" Project** (上海市“晨光计划”项目, Project No. `24CGA52`, 2025.01 – 2026.12).

### Background & Challenges
Heterogeneous marine sensor networks operate across air-water interfaces where sound speed profiles vary dynamically with temperature, salinity, and depth. Acoustic ray bending and transmission attenuation introduce severe non-convex biases into time-of-flight measurements.

### Key Innovations & Methodology
1. **Ray Acoustics & Sound Speed Profile (SSP) Inversion**:
   - Built nonlinear acoustic propagation loss and ray-bending compensation models based on real-time sound speed profiles (SSP).
   - Proposed a **joint Maximum Likelihood Estimation (MLE)** framework simultaneously solving for target positions and multipath signal propagation parameters.
2. **Riemannian Covariance Intersection (CI) Fusion**:
   - Constructed decentralized Covariance Intersection fusion estimators directly on Riemannian manifolds to handle anchor node drift and packet losses.
   - Designed a channel-decoupling strategy to dynamically adjust sensor fusion weight matrices, transforming non-convex localization problems into tractable convex subproblems with minimal conservatism.
