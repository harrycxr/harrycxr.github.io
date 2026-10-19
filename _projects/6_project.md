---
layout: page
title: Bi-Level Spatio-Temporal Decoupled Observer for Multi-Ship Trajectory Inference
description: COLREGS-compliant asymmetric relative intention observation, Selective State Spaces (SSM), and differentiable EKF with GMM uncertainty bounds.
img: assets/img/projects/ship_trajectory.jpg
importance: 6
category: Industrial & Engineering
related_publications: true
---

### Project Overview
Developed during internship as **Intelligent Meteorological Navigation Algorithm Engineer** at the **Beijing Meteorological Navigation Center, National Meteorological Center** (国家气象中心北京气象导航中心, 2025.11 – 2026.02).

---

### Technical Abstract
> *"Multi-ship interactions in complex waters rely on accurate and consistent ship trajectory inference. However, state observers treat the disturbances from neighboring ships as lumped noise for suppression, while inference methods based on graph neural networks employ a distance-decaying symmetric attention mechanism, ignoring the asymmetry of collision avoidance responsibilities stipulated in the International Regulations for Preventing Collisions at Sea (COLREGS). To address this, this paper proposes a bi-level spatio-temporal decoupled observer architecture.*
>
> *First, the architecture constructs a relative motion intention observation model, endowing the observer with the capability to recognize asymmetric multi-ship interactions. Second, a bi-level decoupled update mechanism integrating selective state space models is designed. By alternately configuring the temporal inertial evolution block and the spatial interaction correction block between iterations, this mechanism achieves topological disturbance feedforward while maintaining linear computational complexity. Furthermore, the model introduces a differentiable extended Kalman filter (EKF)-based probability boundary estimator and a physics-informed rolling recurrence strategy to output an uncertainty convergence domain fused with a Gaussian Mixture Model (GMM) for downstream control. Experiments demonstrate that the proposed Spatio-temporal State Observer (SSO) architecture achieves optimal maximum cross-track estimation accuracy during the disturbance-induced deviation phase and maintains a low rule violation rate, providing a robust probabilistic prediction baseline."*

---

### Key Methodological Innovations

#### 1. COLREGS-Compliant Asymmetric Relative Motion Intention Model
- Conventional graph neural networks (GNNs) employ distance-decaying symmetric attention, neglecting legal stand-on vs. give-way responsibilities under maritime rules.
- Designed an intention-aware interaction topology explicitly encoding the navigation rules stipulated in **COLREGS**, distinguishing reciprocal collision-avoidance commitments.

#### 2. Bi-Level Decoupled Architecture with Selective State Spaces (SSM)
- Integrated modern **Selective State Space Models (SSM)** to achieve long-sequence temporal memory while preserving $$\mathcal{O}(N)$$ linear computational complexity.
- Alternated iterative execution between:
  - **Temporal Inertial Evolution Block**: Captures single-vessel kinematic and hydrodynamic inertia.
  - **Spatial Interaction Correction Block**: Compensates for topological disturbances induced by adjacent vessels.

#### 3. Differentiable EKF & Physics-Informed GMM Uncertainty Estimation
- Formulated an end-to-end differentiable Extended Kalman Filter (EKF) layer ensuring physical consistency across rolling recurrence horizons.
- Fused state covariance outputs into **Gaussian Mixture Models (GMM)** to bound the predictive uncertainty domain, providing certified safety corridors for downstream autonomous collision-avoidance control.
