---
layout: page
title: Energy-Minimizing Weather Vaning & Eco-DP Control for Offshore Support Vessels
description: A-ESKF under acoustic outages, wave-frequency RAO feedforward, and dynamic barrier ENMPC weather vaning.
img: assets/img/projects/osv_dp.jpg
importance: 5
category: Industrial & Engineering
related_publications: false
---

### Project Overview
Developed during internship as **DP3 Dynamic Positioning Algorithm Engineer** at **Shenyuanhai Intelligent Equipment & Harbin Engineering University Smart Equipment** (神远海智装 & 哈船智装, 2026.07 – 2026.09).

### Engineering Challenge
Modern Offshore Support Vessels (OSV) and semi-submersible drilling platforms (e.g., *HYSY 981 / Fenjin*) endure harsh, long-period swells during floatover installations, heavy lifting, and subsea robot (ROV/UUV) target following. Two primary vulnerabilities plague conventional DP systems:
1. **Acoustic Outages & Packet Dropouts**: USBL acoustic signals suffer heavy multipath distortion and prolonged loss (up to tens of seconds) caused by jacket platform leg shadowing and aerated thruster wake wash.
2. **Parasitic Fuel Consumption**: Forcing vessels to maintain fixed headings against lateral environmental forces triggers massive thrust peaks and severe thruster mechanical fatigue.

---

### Key Innovations & Methodology

#### 1. Adaptive Error-State Kalman Filter (A-ESKF) under Intermittent Dropout
- Formulated acoustic communication link status via an independent and identically distributed **Bernoulli process** ($$\gamma_k \in \{0, 1\}$$).
- Integrated **Sage-Husa noise statistic estimators** to perform online covariance matching for measurement noise $$R_k$$ and process noise $$Q_k$$ via sliding-window innovation statistics.
- Employed **Joseph-form covariance updates** to guarantee positive semi-definiteness, eliminating filter divergence and maintaining smooth low-frequency environmental bias estimates throughout extended sensor blackouts.

#### 2. Swell Field State-Space Reconstruction & RAO Feedforward Compensation
- Reconstructed multi-frequency wavefield states using skew-symmetric harmonic oscillator blocks based on **Airy Wave Theory**.
- Mapped estimated wave elevations to vessel 3-DOF forces via vessel **Response Amplitude Operators (RAO)**.
- Injected soft feedforward compensation $$\tau_{FF}$$ directly into the control loop, decoupling 1st-order wave-frequency oscillations and preventing thruster chattering without introducing phase lag.

#### 3. Energy-Saving Nonlinear MPC (ENMPC) with Dynamic Weather Vaning
- Formulated an optimal control problem solved via **Direct Multiple Shooting (DMS)** and **IPOPT** with shifted warm-start strategies to achieve 10Hz real-time execution.
- Designed dynamic logarithmic barrier weight functions: inside the designated safety watch circle ($$T_{th}$$), heading constraints are dynamically relaxed ($$\pi_3 \to 0$$), allowing the vessel to naturally align with the resultant environmental force (**Weather Vaning**), slashing thrust demands by **40%–70%**.
- As the vessel approaches the watch circle boundary, logarithmic barrier penalties surge, automatically switching to stiff positioning to guarantee operational safety.

#### 4. Non-convex SQP Thrust Allocation & Sea Trial Validation
- Developed a Sequential Quadratic Programming (SQP) allocator optimizing hydrodynamic power $$P \propto T^{3/2}$$, azimuth thruster anti-spin penalties ($$\Delta \alpha^T \Omega \Delta \alpha$$), and singularity avoidance ($$\det(B B^T)$$).
- **Experimental & Sea Trial Verification**: Validated on semi-submersible drilling platform models and full-scale DP trials on *Princess Mengna*, maintaining **95% CEP** well within target boundaries while delivering ultra-smooth thrust commands.
