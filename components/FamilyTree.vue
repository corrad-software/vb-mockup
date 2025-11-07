<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  familyData: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['node-click'])

const svgWidth = 1200
const svgHeight = 600
const nodeWidth = 180
const nodeHeight = 120
const levelSpacing = 180
const siblingSpacing = 220

// Build tree structure
const treeData = computed(() => {
  const levels = {}

  // Group by level
  props.familyData.forEach(member => {
    const level = member.level || 0
    if (!levels[level]) levels[level] = []
    levels[level].push(member)
  })

  // Position nodes
  const positioned = []
  Object.keys(levels).sort().forEach((level, levelIndex) => {
    const members = levels[level]
    const totalWidth = members.length * siblingSpacing
    const startX = (svgWidth - totalWidth) / 2 + siblingSpacing / 2

    members.forEach((member, index) => {
      positioned.push({
        ...member,
        x: startX + (index * siblingSpacing),
        y: 60 + (levelIndex * levelSpacing)
      })
    })
  })

  return positioned
})

// Build edges/connections
const edges = computed(() => {
  const connections = []

  treeData.value.forEach(node => {
    if (node.parentId) {
      const parent = treeData.value.find(n => n.id === node.parentId)
      if (parent) {
        connections.push({
          x1: parent.x,
          y1: parent.y + nodeHeight / 2,
          x2: node.x,
          y2: node.y - 20
        })
      }
    }
  })

  return connections
})

// Get kifayah categories for display
const getKifayahBadges = (member) => {
  const badges = []

  if (member.kategoriKeluarga === 'Ketua Keluarga' &&
      (member.statusKediaman === 'Milik Sendiri' || member.statusKediaman === 'Kediaman Percuma')) {
    badges.push('1')
  }

  if (member.umur >= 18) {
    badges.push(member.statusPekerjaan === 'Bekerja' ? '2' : '3')
  }

  if (member.kategoriIndividu === 'Tanggungan') {
    if (member.tahapPendidikan === 'IPT' || member.tahapPendidikan === 'Diploma' || member.tahapPendidikan === 'Ijazah') {
      badges.push('4')
    } else if (member.umur >= 7 && member.umur <= 17) {
      badges.push('5')
    } else if (member.umur <= 6) {
      badges.push('6')
    }
  }

  if (member.tahapKesihatan === 'OKU') badges.push('7')
  if (member.tahapKesihatan === 'Sakit Kronik') badges.push('8')
  if (member.umur <= 12 && member.kategoriIndividu === 'Tanggungan') badges.push('9')

  return badges
}

const handleNodeClick = (node) => {
  emit('node-click', node)
}
</script>

<template>
  <div class="family-tree-container">
    <svg :width="svgWidth" :height="svgHeight" class="family-tree-svg">
      <!-- Draw connections first (behind nodes) -->
      <g class="edges">
        <path
          v-for="(edge, index) in edges"
          :key="`edge-${index}`"
          :d="`M ${edge.x1},${edge.y1} C ${edge.x1},${(edge.y1 + edge.y2) / 2} ${edge.x2},${(edge.y1 + edge.y2) / 2} ${edge.x2},${edge.y2}`"
          class="edge-path"
        />
      </g>

      <!-- Draw nodes -->
      <g class="nodes">
        <g
          v-for="node in treeData"
          :key="node.id"
          :transform="`translate(${node.x - nodeWidth/2}, ${node.y - nodeHeight/2})`"
          class="node-group"
          @click="handleNodeClick(node)"
        >
          <!-- Node rectangle -->
          <rect
            :width="nodeWidth"
            :height="nodeHeight"
            :class="[
              'node-rect',
              {
                'node-incomplete': !node.nama || !node.noId,
                'node-ketua': node.kategoriKeluarga === 'Ketua Keluarga'
              }
            ]"
            rx="8"
          />

          <!-- Node content -->
          <foreignObject :width="nodeWidth" :height="nodeHeight">
            <div class="node-content">
              <div class="node-header">
                <div class="node-name">{{ node.nama || 'Tiada Nama' }}</div>
                <rs-badge v-if="!node.nama || !node.noId" variant="error" size="sm" class="incomplete-badge">
                  Tak Lengkap
                </rs-badge>
              </div>

              <div class="node-body">
                <div class="node-info">{{ node.kategoriKeluarga || 'N/A' }}</div>
                <div class="node-info">{{ node.kategoriIndividu || 'N/A' }}</div>
                <div class="node-info"><strong>Umur:</strong> {{ node.umur || 0 }}</div>

                <div v-if="getKifayahBadges(node).length" class="kifayah-badges">
                  <span class="kifayah-label">Had Kifayah:</span>
                  <span
                    v-for="badge in getKifayahBadges(node).slice(0, 3)"
                    :key="badge"
                    class="kifayah-number"
                  >
                    {{ badge }}
                  </span>
                  <span v-if="getKifayahBadges(node).length > 3" class="kifayah-more">
                    +{{ getKifayahBadges(node).length - 3 }}
                  </span>
                </div>
              </div>
            </div>
          </foreignObject>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.family-tree-container {
  width: 100%;
  height: 600px;
  border: 1px solid rgb(var(--border-color));
  border-radius: 8px;
  overflow: auto;
  background: rgb(var(--bg-2));
}

.family-tree-svg {
  display: block;
}

.edge-path {
  fill: none;
  stroke: rgb(var(--border-color));
  stroke-width: 2px;
}

.node-group {
  cursor: pointer;
  transition: all 0.2s;
}

.node-group:hover .node-rect {
  filter: brightness(0.95);
  stroke-width: 3px;
}

.node-rect {
  fill: rgb(var(--bg-1));
  stroke: rgb(var(--border-color));
  stroke-width: 2px;
  transition: all 0.2s;
}

.node-rect.node-incomplete {
  fill: rgba(var(--error), 0.1);
  stroke: rgb(var(--error));
}

.node-rect.node-ketua {
  fill: rgba(var(--primary), 0.1);
  stroke: rgb(var(--primary));
}

.node-content {
  width: 100%;
  height: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  color: rgb(var(--text-color));
}

.node-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgb(var(--border-color));
}

.node-name {
  font-weight: 600;
  font-size: 13px;
  line-height: 1.2;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.incomplete-badge {
  flex-shrink: 0;
  font-size: 9px !important;
  padding: 2px 4px !important;
}

.node-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
}

.node-info {
  font-size: 11px;
  color: rgb(var(--text-muted));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.node-info strong {
  color: rgb(var(--text-color));
}

.kifayah-badges {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px solid rgb(var(--border-color));
}

.kifayah-label {
  font-size: 10px;
  font-weight: 600;
  color: rgb(var(--primary));
}

.kifayah-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: rgba(var(--primary), 0.15);
  color: rgb(var(--primary));
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.kifayah-more {
  font-size: 9px;
  color: rgb(var(--text-muted));
  font-weight: 600;
}
</style>
