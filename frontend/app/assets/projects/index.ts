import audienceQueryLanguage from './audience-query-language.webp'
import audienceSync from './audience-sync.webp'
import ivle from './ivle.webp'
import portfolio from './portfolio.webp'
import sitewiseMetering from './sitewise-metering.webp'

// Cover image for each project, matched by the project's title from the API.
export const projectCovers: Record<string, string> = {
  Portfolio: portfolio,
  'SiteWise Metering Storage and Get Client': sitewiseMetering,
  'Audience Query Language': audienceQueryLanguage,
  'In-house Audience Sync': audienceSync,
  'Investigating Virtual Learning Environments': ivle,
}
