export const paths = {
  // // auth
  // login: "/auth/login",
  // get_user: "/user/me",
  // user_profile: "/user/profile",

  // // apis
  // get_bounties: "/bounty",
  // get_grants: "/grant",
  // create_grants: "/grant",
  // get_grant_details: "/grant/details",
  // become_sponsor: "/sponsor/upgrade",
  // get_sponsor: "/sponsor/me",
  // create_bounties: "sponsor/bounty",

  // pages
  onboarding: "/onboarding",
  user_onboarding: "/onboarding/user",
  sponsor_onboarding: "/onboarding/sponsor",
  profile: "/profile",
  user_rewards: "/my-rewards",
  my_notifiaction: "/my-notification",
  bounties: "/",
  grants: "/grants",
  wpl_program: "/wpl-program",
  create_bounty: "/sponsor/create-bounty",
  create_grant: "/sponsor/create-grant",
  leaderboard: "/leaderboard",
  sponsor_dashboard: "/sponsor",
  become_a_sponsor: "/become-a-sponsor",
  sponsor_details: "/admin/sponsor",
  bounty_winner_rewards: "/sponsor/rewards",
  sponsor_public_profile: "/profile/sponsor",
  user_public_profile: "/profile/user",
  bounty_details: "/admin/listing/bounty",
  grants_details: "admin/listing/grant"
};

export const api_paths = {
  // user
  login: "/auth/login",
  get_user: "/user/me",
  user_profile: "/user/profile",
  check_username: "/user/check-username",
  notification: "/notification",
  email_signup: "/auth/register",
  verify_email: "/auth/verify-email",
  login_v_1: "/auth/login_v_1",
  forgot_password: "/auth/forgot-password",
  reset_password: "/auth/reset-password",
  resend_opt: "/auth/resend-otp",
  get_user_public_profile: "/user/profile",
  platform_analytics: "/user/dashboard-analytics",

  // bounty
  bounty: "/bounty",
  bounty_detail: "/bounty/details",
  submit_bounty: "/user/submit-bounty",
  is_bounty_submitted: "/bounty/isSubmitted",
  bounty_submission: "/bounty/submissions",
  bounty_view: "/bounty/viewed",
  declare_winners: "/sponsor/declare-winners",
  slug_available: "/bounty/isSlug",
  publish_bounty: "/bounty/publish",
  bounty_winners: "/bounty/winners",
  declared_bounty_winners: "/bounty/winners",
  request_approval: "/bounty/request",
  delete_bounty_draft: "/bounty/delete-draft",
  withdraw_bounty_applicatin: "/bounty/withdraw",

  // notifiactions
  get_notification_detail: "/notification/details",
  notification_viewed: "/notification/viewed",
  notification_view_all: "/notification/view-all",
  get_activity: "/activity",

  // grant
  grant: "/grant",
  grant_details: "/grant/details",
  grant_actions: "/grant/actions",
  grant_request_approval: "/grant/request",
  grant_publish: "/grant/request",
  grant_withdraw: "/grant/withdraw",
  grant_delete: "/grant/delete",

  // sponsor
  become_sponsor: "/sponsor/upgrade",
  get_sponsor: "/sponsor/me",
  get_sponsor_details: "/sponsor/id",
  create_bounties: "/sponsor/bounty",
  sponsor_kpi: "/sponsor/kpi", //new
  get_sponsor_listing: "/sponsor/listings", //new
  shortlist_submission: "/sponsor/shortlist",
  edit_sponsor_details: "/sponsor",
  get_sponsor_public_profile: "/sponsor/details",
  request_verification: "/sponsor/verify",
  close_bounty: "/sponsor/close-bounty",


  // admin
  verify_sponsor: "/admin/verify-sponsor",
  verify_bounty: "/admin/verify-bounty",
  verify_grant: "/admin/verify-grant",
  admin_kpis: "/admin/sponsor-kpi",
  get_active_requests: "/admin/pending-requests",
  admin_listing: "/admin/listings",
  get_admin_sponsors: "/admin/all-sponsors",
  whitelist_sponsor: "/admin/whitelist",

  // leaderboard
  leaderboard: "/admin/leaderboards",

  // payments
  get_user_kyc: "/kycs/status/",
  send_payment: "/transfers/send",
  send_batch_payment: "/transfers/send-batch",

  // image
  upload_image: "/s3/upload",
  get_presigned_url: "/s3/signed-url",

  // copperx
  post_creds: "/user/creds",
  get_creds: "/user/creds",
  user_kyc: "/user/kyc",
  send_payments: "/transactions/send",
  copperx_wallet_balance: "/transactions/wallet-balance",
  get_total_rewards: "/transactions/total-rewards",


  // transaction
  transaction_history: "/transactions/history"
};
