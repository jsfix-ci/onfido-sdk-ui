import type { DeviceTypes } from './commons'
import type { StepConfig } from './steps'

export const USER_ANALYTICS_EVENT = 'userAnalyticsEvent'

export type LegacyTrackedEventNames =
  | 'screen_complete'
  | 'screen_complete_crossdevice_mobile_success'
  | 'screen_document_country_select'
  | 'screen_document_crossDevice_client_intro'
  | 'screen_face_crossDevice_client_intro'
  | 'screen_poa_crossDevice_client_intro'
  | 'screen_crossDevice_desktop_submit'
  | 'screen_crossDevice_crossdevice_link'
  | 'screen_crossDevice'
  | 'copy link selected'
  | 'qr code selected'
  | 'sms selected'
  | 'screen_crossDevice_mobile_notification_sent'
  | 'screen_crossDevice_mobile_connected'
  | 'screen_crossDevice_sms_failed'
  | 'screen_crossDevice_sms_overuse'
  | 'Starting upload'
  | 'Taking live photo of document'
  | 'screen_document_back_capture'
  | 'screen_document_front_capture'
  | 'screen_document_front_capture_file_upload'
  | 'screen_document_back_capture_file_upload'
  | 'screen_document_front_capture_camera_not_working'
  | 'screen_document_back_capture_camera_not_working'
  | 'screen_document_front_capture_camera_not_working_no_fallback'
  | 'screen_document_back_capture_camera_not_working_no_fallback'
  | 'screen_document_front_capture_camera_inactive'
  | 'screen_document_back_capture_camera_inactive'
  | 'screen_document_front_capture_camera_inactive_no_fallback'
  | 'screen_document_back_capture_camera_inactive_no_fallback'
  | 'screen_document_front_capture_request_error'
  | 'screen_document_back_capture_request_error'
  | 'screen_document_back_confirmation'
  | 'screen_document_front_confirmation'
  | 'screen_document_front_confirmation_cutoff_detected'
  | 'screen_document_back_confirmation_cutoff_detected'
  | 'screen_document_front_confirmation_blur_detected'
  | 'screen_document_back_confirmation_blur_detected'
  | 'screen_document_front_confirmation_glare_detected'
  | 'screen_document_back_confirmation_glare_detected'
  | 'screen_document_front_confirmation_request_error'
  | 'screen_document_back_confirmation_request_error'
  | 'screen_document_front_confirmation_document_detection'
  | 'screen_document_back_confirmation_document_detection'
  | 'screen_document_front_confirmation_invalid_type'
  | 'screen_document_back_confirmation_invalid_type'
  | 'screen_document_fallback_clicked'
  | 'screen_document_image_quality_guide'
  | 'screen_document_image_quality_guide_invalid_type'
  | 'screen_document_image_quality_guide_invalid_size'
  | 'screen_document_type_select'
  | 'screen_document_document_video_capture_file_upload'
  | 'screen_document_document_video_capture'
  | 'screen_document_document_video_capture_fallback_triggered'
  | 'screen_document_document_video_capture_doc_video_timeout'
  | 'screen_document_confirmation_video_play_clicked'
  | 'screen_document_confirmation_video_pause_clicked'
  | 'screen_document_confirmation_video_playback_finished'
  | 'screen_face_selfie_intro'
  | 'screen_face_selfie_capture_file_upload'
  | 'screen_face_selfie_capture'
  | 'screen_face_selfie_capture_camera_not_working'
  | 'screen_face_selfie_capture_camera_not_working_no_fallback'
  | 'screen_face_selfie_capture_camera_inactive'
  | 'screen_face_selfie_capture_camera_inactive_no_fallback'
  | 'screen_face_selfie_confirmation'
  | 'screen_face_selfie_confirmation_no_face_error'
  | 'screen_face_selfie_confirmation_multiple_faces_error'
  | 'screen_face_selfie_confirmation_request_error'
  | 'screen_face_selfie_confirmation_unsupported_file'
  | 'screen_face_selfie_capture_fallback_triggered'
  | 'Snapshot upload completed'
  | 'Starting snapshot upload'
  | 'Starting live photo upload'
  | 'Live photo upload completed'
  | 'screen_face_face_video_capture_file_upload'
  | 'screen_face_face_video_capture_record_button_click'
  | 'screen_face_face_video_capture_recording_next_click'
  | 'screen_face_face_video_capture'
  | 'screen_face_face_video_capture_face_video_timeout'
  | 'screen_face_face_video_capture_camera_inactive'
  | 'screen_face_face_video_capture_camera_not_working'
  | 'screen_face_face_video_capture_camera_not_working_no_fallback'
  | 'screen_face_face_video_capture_fallback_triggered'
  | 'screen_face_face_video_camera_inactive_no_fallback'
  | 'screen_face_video_capture_step_1'
  | 'screen_face_video_capture_step_2'
  | 'screen_face_video_challenge_load_failed'
  | 'screen_face_video_challenge_loaded'
  | 'screen_face_video_challenge_requested'
  | 'screen_face_face_video_confirmation'
  | 'screen_face_face_video_confirmation_request_error'
  | 'screen_face_face_video_confirmation_video_error'
  | 'screen_face_face_video_confirmation_play_clicked'
  | 'screen_face_face_video_confirmation_pause_clicked'
  | 'screen_face_face_video_confirmation_playback_finished'
  | 'screen_face_face_video_capture_fallback_triggered'
  | 'screen_face_video_intro'
  | 'completed flow'
  | 'started flow'
  | 'screen_forbidden_client_error'
  | 'screen_generic_client_error'
  | 'screen_interrupted_flow_error'
  | 'screen_poa_poa_file_upload'
  | 'screen_poa_poa'
  | 'screen_poa_front_confirmation'
  | 'screen_poa_type_select'
  | 'screen_poa'
  | 'screen_unsupported_android_browser'
  | 'screen_unsupported_ios_browser'
  | 'Completed upload'
  | 'screen_userConsent'
  | 'screen_welcome'
  | 'Triggering onSubmitSelfie callback'
  | 'Triggering onSubmitVideo callback'
  | 'Triggering onSubmitDocument callback'
  | 'Error response from onSubmitSelfie'
  | 'Error response from onSubmitVideo'
  | 'Error response from onSubmitDocument'
  | 'document_upload_started'
  | 'document_upload_completed'
  | 'document_video_upload_started'
  | 'document_video_upload_completed'
  | 'face_video_upload_started'
  | 'face_video_upload_completed'

export type UserAnalyticsEventNames =
  | 'WELCOME'
  | 'USER_CONSENT'
  | 'DOCUMENT_CAPTURE_FRONT'
  | 'DOCUMENT_CAPTURE_CONFIRMATION_FRONT'
  | 'DOCUMENT_CAPTURE_BACK'
  | 'DOCUMENT_CAPTURE_CONFIRMATION_BACK'
  | 'FACIAL_INTRO'
  | 'FACIAL_CAPTURE'
  | 'FACIAL_CAPTURE_CONFIRMATION'
  | 'VIDEO_FACIAL_INTRO'
  | 'VIDEO_FACIAL_CAPTURE_STEP_1'
  | 'VIDEO_FACIAL_CAPTURE_STEP_2'
  | 'DOCUMENT_TYPE_SELECT'
  | 'ID_DOCUMENT_COUNTRY_SELECT'
  | 'CROSS_DEVICE_INTRO'
  | 'CROSS_DEVICE_GET_LINK'
  | 'UPLOAD'

export type UserAnalyticsEventDetail = {
  eventName: UserAnalyticsEventNames
  isCrossDevice: boolean
  properties: Record<string, unknown>
}

type TrackedEventTypes = 'screen' | 'action' | 'flow' | 'view'

export type TrackedEnvironmentData = {
  device?: DeviceTypes
  os: string
  os_version: string
  browser: string
  browser_version: string
}

type UIAlerts =
  | 'cutoff'
  | 'blur'
  | 'glare'
  | 'request_error'
  | 'invalid_capture'
  | 'invalid_type'
  | 'invalid_size'
  | 'no_face'
  | 'multiple_faces'
  | 'document_capture'
  | 'document_detection'
  | 'face_video_timeout'
  | 'doc_video_timeout'
  | 'unsupported_file'
  | 'camera_not_working'
  | 'camera_inactive'
  | 'video_error'

export type AnalyticsEventProperties = {
  event_type?: TrackedEventTypes
  step?: string
  is_cross_device?: boolean
  is_custom_ui?: boolean
  status?: string
  capture_method_rendered?: 'upload' | 'camera'
  document_side?: 'front' | 'back'
  video_capture_step?: 'step1' | 'step2'
  link_method_selected?: 'copy' | 'qr_code' | 'sms'
  has_fallback?: boolean
  ui_alerts?: {
    [key in UIAlerts]?: 'error' | 'warning' | null
  }
  callback_name?: string
}

export type AnalyticsPayload = {
  applicant_uuid?: string
  client_uuid?: string
  event?: AnalyticsTrackedEventNames
  event_metadata: {
    domain: string
  } & TrackedEnvironmentData
  event_time: string
  event_uuid: string
  properties: AnalyticsEventProperties
  session_uuid?: string
  source: string
  source_metadata: {
    platform?: string
    version?: string
    sdk_environment?: string
  }
  sdk_config: {
    expected_steps: string
    steps_config?: StepConfig[]
    sdk_token?: string
  }
}

export type AnalyticsTrackedEventNames =
  | 'COMPLETE'
  | 'COMPLETE_CROSS_DEVICE_MOBILE_SUCCESS'
  | 'COUNTRY_SELECTION'
  | 'CROSS_DEVICE_CLIENT_INTRO'
  | 'CROSS_DEVICE_DESKTOP_SUBMIT'
  | 'CROSS_DEVICE_GET_LINK'
  | 'CROSS_DEVICE_INTRO'
  | 'CROSS_DEVICE_LINK_METHOD_SELECTED'
  | 'CROSS_DEVICE_MOBILE_NOTIFICATION_SENT'
  | 'CROSS_DEVICE_MOBILE_SUBMIT'
  | 'CROSS_DEVICE_SMS_FAILED'
  | 'CROSS_DEVICE_SMS_OVERUSE'
  | 'CUSTOM_API_REQUEST_STARTED'
  | 'CUSTOM_CALLBACK_TRIGGERED'
  | 'CUSTOM_CALLBACK_ERROR'
  | 'DOCUMENT_CAMERA_ERROR'
  | 'DOCUMENT_CAMERA_SHUTTER_CLICK'
  | 'DOCUMENT_CAPTURE'
  | 'DOCUMENT_CAPTURE_ERROR'
  | 'DOCUMENT_CONFIRMATION'
  | 'DOCUMENT_CONFIRMATION_ERROR'
  | 'DOCUMENT_FALLBACK_CLICKED'
  | 'DOCUMENT_IMAGE_QUALITY_GUIDE'
  | 'DOCUMENT_IMAGE_QUALITY_GUIDE_ERROR'
  | 'DOCUMENT_TYPE_SELECTION'
  | 'DOCUMENT_VIDEO_CAPTURE'
  | 'DOCUMENT_VIDEO_CAPTURE_ERROR'
  | 'DOCUMENT_VIDEO_FALLBACK_TRIGGERED'
  | 'DOCUMENT_VIDEO_CONFIRMATION_PLAY_CLICKED'
  | 'DOCUMENT_VIDEO_CONFIRMATION_PAUSE_CLICKED'
  | 'DOCUMENT_VIDEO_CONFIRMATION_PLAYBACK_FINISHED'
  | 'FACE_INTRO'
  | 'FACE_SELFIE_CAPTURE'
  | 'FACE_SELFIE_CAPTURE_ERROR'
  | 'FACE_SELFIE_CONFIRMATION'
  | 'FACE_SELFIE_CONFIRMATION_ERROR'
  | 'FACE_SELFIE_FALLBACK_TRIGGERED'
  | 'FACE_SELFIE_SNAPSHOT_UPLOAD_COMPLETED'
  | 'FACE_SELFIE_SNAPSHOT_UPLOAD_STARTED'
  | 'FACE_SELFIE_UPLOAD_STARTED'
  | 'FACE_SELFIE_UPLOAD_COMPLETED'
  | 'FACE_VIDEO_CAPTURE'
  | 'FACE_VIDEO_CAPTURE_ERROR'
  | 'FACE_VIDEO_CAPTURE_RECORD_BUTTON_CLICKED'
  | 'FACE_VIDEO_CAPTURE_RECORDING_NEXT_CLICKED'
  | 'FACE_VIDEO_CHALLENGE_FETCH_ERROR'
  | 'FACE_VIDEO_CHALLENGE_LOADED'
  | 'FACE_VIDEO_CHALLENGE_REQUESTED'
  | 'FACE_VIDEO_CONFIRMATION'
  | 'FACE_VIDEO_CONFIRMATION_ERROR'
  | 'FACE_VIDEO_CONFIRMATION_VIDEO_ERROR'
  | 'FACE_VIDEO_CONFIRMATION_PLAY_CLICKED'
  | 'FACE_VIDEO_CONFIRMATION_PAUSE_CLICKED'
  | 'FACE_VIDEO_CONFIRMATION_PLAYBACK_FINISHED'
  | 'FACE_VIDEO_FALLBACK_TRIGGERED'
  | 'FACE_VIDEO_INTRO'
  | 'FLOW_COMPLETED'
  | 'FLOW_STARTED'
  | 'FORBIDDEN_CLIENT_ERROR'
  | 'GENERIC_CLIENT_ERROR'
  | 'INTERRUPTED_FLOW_ERROR'
  | 'POA_CAPTURE'
  | 'POA_CAPTURE_POA'
  | 'POA_CONFIRMATION'
  | 'POA_DOCUMENT_TYPE_SELECTION'
  | 'POA_INTRO'
  | 'UNSUPPORTED_BROWSER'
  | 'UPLOAD_COMPLETED'
  | 'USER_CONSENT'
  | 'WELCOME'
  | 'DOCUMENT_UPLOAD_STARTED'
  | 'DOCUMENT_UPLOAD_COMPLETED'
  | 'DOCUMENT_VIDEO_UPLOAD_STARTED'
  | 'DOCUMENT_VIDEO_UPLOAD_COMPLETED'
  | 'FACE_VIDEO_UPLOAD_STARTED'
  | 'FACE_VIDEO_UPLOAD_COMPLETED'
