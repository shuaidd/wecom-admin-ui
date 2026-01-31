<script setup lang="ts">
import { CloseOutlined } from '@ant-design/icons-vue'

interface Tab {
  id: string
  title: string
  path: string
  active: boolean
}

const props = defineProps<{
  tabs: Tab[]
  activeTabId: string
}>()

const emit = defineEmits<{
  (e: 'tabClick', tabId: string): void
  (e: 'tabClose', tabId: string): void
}>()

const handleTabClick = (tabId: string) => {
  emit('tabClick', tabId)
}

const handleClose = (event: MouseEvent, tabId: string) => {
  event.stopPropagation()
  emit('tabClose', tabId)
}
</script>

<template>
  <div class="chrome-tabs-container">
    <div class="chrome-tabs">
      <div
        v-for="(tab, index) in props.tabs"
        :key="tab.id"
        class="chrome-tab"
        :class="{
          active: tab.id === props.activeTabId,
          first: index === 0,
        }"
        @click="handleTabClick(tab.id)"
      >
        <!-- Tab background with gradient -->
        <div class="tab-background">
          <div class="tab-bg-layer"></div>
        </div>

        <!-- Tab content -->
        <div class="tab-content">
          <div class="tab-indicator" v-if="tab.id === props.activeTabId"></div>
          <span class="tab-title">{{ tab.title }}</span>
          <button
            v-if="props.tabs.length > 1"
            class="tab-close"
            @click="(e) => handleClose(e, tab.id)"
          >
            <CloseOutlined class="close-icon" />
          </button>
        </div>
      </div>

      <!-- New tab button -->
      <button class="new-tab-btn" @click="$emit('tabClick', 'new')">
        <span class="new-tab-icon">+</span>
      </button>
    </div>

    <!-- Tab bottom border with gradient -->
    <div class="tabs-border"></div>
  </div>
</template>

<style scoped>
.chrome-tabs-container {
  background: var(--tabs-bg, linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%));
  padding: 8px 16px 0;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.chrome-tabs {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  position: relative;
  z-index: 1;
  padding: 0 4px;
}

.chrome-tab {
  position: relative;
  min-width: 140px;
  max-width: 220px;
  height: 38px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}

.chrome-tab:hover {
  z-index: 10;
  transform: translateY(-2px);
}

.chrome-tab.active {
  z-index: 20;
  height: 40px;
  margin-top: -2px;
}

/* Tab background with gradient and shadow */
.tab-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}

.tab-bg-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--tab-inactive-bg, linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%));
  border-radius: 10px 10px 0 0;
  transition: all 0.3s ease;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.05);
}

.chrome-tab:hover .tab-bg-layer {
  background: var(--tab-hover-bg, linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    0 4px 8px rgba(0, 0, 0, 0.08);
}

.chrome-tab.active .tab-bg-layer {
  background: var(--tab-active-bg, linear-gradient(180deg, #ffffff 0%, #f8fafc 100%));
  box-shadow:
    0 -2px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* Tab content */
.tab-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 100%;
  gap: 10px;
}

/* Active indicator line */
.tab-indicator {
  position: absolute;
  top: 0;
  left: 12px;
  right: 12px;
  height: 3px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 0 3px 3px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

.tab-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--tab-inactive-text, #64748b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
}

.chrome-tab:hover .tab-title {
  color: var(--tab-hover-text, #475569);
}

.chrome-tab.active .tab-title {
  color: var(--tab-active-text, #1e293b);
  font-weight: 600;
  font-size: 14px;
}

/* Close button with improved design */
.tab-close {
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.tab-close::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: var(--close-hover-bg, rgba(220, 38, 38, 0.1));
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
}

.tab-close:hover::before {
  width: 100%;
  height: 100%;
}

.chrome-tab:hover .tab-close {
  opacity: 1;
}

.chrome-tab.active .tab-close {
  opacity: 1;
}

.tab-close:hover {
  background: var(--close-hover-bg, rgba(220, 38, 38, 0.1));
}

.close-icon {
  font-size: 11px;
  color: var(--close-icon-color, #94a3b8);
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.tab-close:hover .close-icon {
  color: var(--close-hover-color, #dc2626);
  transform: scale(1.1);
}

/* New tab button with improved design */
.new-tab-btn {
  width: 34px;
  height: 34px;
  border: none;
  background: transparent;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 8px;
  margin-bottom: 2px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.new-tab-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--new-tab-hover-bg, rgba(102, 126, 234, 0.1));
  opacity: 0;
  transition: opacity 0.2s ease;
  border-radius: 8px;
}

.new-tab-btn:hover::before {
  opacity: 1;
}

.new-tab-btn:hover {
  transform: scale(1.05);
}

.new-tab-icon {
  font-size: 22px;
  color: var(--new-tab-color, #64748b);
  font-weight: 300;
  line-height: 1;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.new-tab-btn:hover .new-tab-icon {
  color: var(--new-tab-hover-color, #667eea);
  transform: rotate(90deg);
}

/* Bottom border with gradient */
.tabs-border {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--tab-active-border, #e2e8f0) 10%,
    var(--tab-active-border, #e2e8f0) 90%,
    transparent 100%
  );
  z-index: 0;
}

/* Dark theme variables */
:global([data-theme='dark']) {
  --tabs-bg: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  --tab-inactive-bg: linear-gradient(180deg, #334155 0%, #1e293b 100%);
  --tab-inactive-text: #94a3b8;
  --tab-hover-bg: linear-gradient(180deg, #475569 0%, #334155 100%);
  --tab-hover-text: #e2e8f0;
  --tab-active-bg: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  --tab-active-text: #f1f5f9;
  --tab-border: #334155;
  --tab-active-border: #334155;
  --close-hover-bg: rgba(248, 113, 113, 0.2);
  --close-icon-color: #94a3b8;
  --close-hover-color: #f87171;
  --new-tab-hover-bg: rgba(102, 126, 234, 0.2);
  --new-tab-color: #94a3b8;
  --new-tab-hover-color: #667eea;
}

:global([data-theme='light']) {
  --tabs-bg: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%);
  --tab-inactive-bg: linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%);
  --tab-inactive-text: #64748b;
  --tab-hover-bg: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%);
  --tab-hover-text: #475569;
  --tab-active-bg: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  --tab-active-text: #1e293b;
  --tab-border: #e2e8f0;
  --tab-active-border: #e2e8f0;
  --close-hover-bg: rgba(220, 38, 38, 0.1);
  --close-icon-color: #94a3b8;
  --close-hover-color: #dc2626;
  --new-tab-hover-bg: rgba(102, 126, 234, 0.1);
  --new-tab-color: #64748b;
  --new-tab-hover-color: #667eea;
}
</style>
