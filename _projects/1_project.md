---
layout: page
title: Polar Sea Ice Sensing & Dynamic Path Planning
description: Multi-source sea ice attitude fusion sensing and ship path dynamic planning for polar navigation.
img: assets/img/12.jpg
importance: 1
category: work
related_publications: false
---

### Project Overview
Supported by the Open Project of the State Key Laboratory of Water Transport Control (Grant No. W26CG000063).

### Research Scope
- **Specialized Acoustic Sensing**: Designed and evaluated acoustic sensing architectures specifically tailored for sub-ice polar environments.
- **Spatio-Temporal Trajectory Tracking**: Established state space models capturing both kinematic and dynamic target characteristics. Combined **ESUKF-M** with resampling mechanisms on Riemannian manifolds, mapping between the manifold and local tangent spaces via exponential/logarithmic mappings to resolve particle degeneracy.
- **Dynamic Path Planning**: Constructed obstacle grid maps using prior environmental data; extracted boundary features using Hough transforms. Designed an improved bidirectional A* search algorithm with adaptive smoothing factors, coupled with **Model Predictive Control (MPC)** for smooth, reliable trajectory execution.
