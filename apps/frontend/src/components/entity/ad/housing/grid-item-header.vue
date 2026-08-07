<script setup lang="ts">
import { E_AD_ENTITY_TYPE, type T_Ad_Housing } from '@scrapland/data-model'
// App
import { useAdChangStatus } from '@/composables/edit-entity/ads/change-status'
import type { PanelAdHousingProps } from '@/components/panels/types'
import { usePanelStore } from '@/stores/panel'
// Components
import CompEntityAdHousingOperationBadge from '@/components/entity/ad/housing/ad-operation-badge.vue'
import CompEntityAdStatusPicker from '@/components/entity/ad/ad-status-picker.vue'
import CompEntityTaskTargetBadge from '@/components/entity/tasks/target-badge.vue'
import CompPanelAdHousing from '@/components/panels/entities/ad/ad-housing.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import CompUiPrice from '@/components/ui/ui-price.vue'
import { ExternalLink, Hammer, Eye } from '@lucide/vue'

const props = defineProps<{ adHousing: T_Ad_Housing }>()

const { isChangingStatus, changeStatus } = useAdChangStatus(E_AD_ENTITY_TYPE.HOUSING)
const panelStore = usePanelStore()

const showPanel = () => {
  panelStore.show<PanelAdHousingProps>(CompPanelAdHousing, {
    housingAd: props.adHousing
  })
}
</script>

<template>
  <div class="--group --group--spread --mb-sm">
    <div class="--group">
      <CompEntityTaskTargetBadge :target="adHousing._ad_target" />
      <CompEntityAdHousingOperationBadge :operation="adHousing._ad_housing_operation" />
    </div>

    <CompEntityAdStatusPicker
      :is-loading="isChangingStatus"
      :status="adHousing._ad_status"
      @status-change="status => changeStatus(adHousing._id, status)" />
  </div>
  <div class="--group --group--spread">
    <div class="--no-overflow">
      <p class="--truncate">{{ adHousing.descriptionShort }}</p>
      <div class="--group --font-bold">
        <template v-if="adHousing.constructionYear">
          <Hammer :size="16" />
          <p>{{ adHousing.constructionYear }}</p>
        </template>
        <CompUiPrice currency="EUR" :price="adHousing.price" />
      </div>
    </div>
    <div class="--group">
      <CompUiIconButton :href="adHousing.url" :icon="ExternalLink" :is-active="false" />
      <CompUiIconButton :icon="Eye" :is-active="false" @click="showPanel" />
    </div>
  </div>
</template>
