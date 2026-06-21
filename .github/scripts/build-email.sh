#!/bin/bash
# Build HTML email for Athena health check
# Called by site-health.yml workflow
# Inputs: environment variables set by workflow steps

HP="${HP_STATUS:-000}"
AD="${AD_STATUS:-000}"
GR="${GR_STATUS:-000}"
SI="${SI_STATUS:-000}"
RO="${RO_STATUS:-000}"
SSL="${SSL_EXPIRY:-unknown}"
JOB_STATUS="${JOB_STATUS:-unknown}"

FAILURES=0
for s in "$HP" "$AD" "$GR" "$SI" "$RO"; do
  [ "$s" != "200" ] && FAILURES=$((FAILURES+1))
done

if [ "$FAILURES" -gt 0 ]; then
  OVERALL="🔴 $FAILURES page(s) need attention"
  OC="#dc2626"
else
  OVERALL="✅ All pages healthy"
  OC="#16a34a"
fi

BOK="OK"
BFAIL="FAIL"

[ "$HP" = "200" ] && HPB="$BOK" || HPB="$BFAIL"
[ "$AD" = "200" ] && ADB="$BOK" || ADB="$BFAIL"
[ "$GR" = "200" ] && GRB="$BOK" || GRB="$BFAIL"
[ "$SI" = "200" ] && SIB="$BOK" || SIB="$BFAIL"
[ "$RO" = "200" ] && ROB="$BOK" || ROB="$BFAIL"

DATE=$(date -u '+%A, %B %d, %Y at %H:%M UTC')

# Generate HTML with sed replacements
# Using a heredoc with quoted delimiter so shell vars don't expand
# then sed replaces placeholders
cat << 'HTMLTEMPLATE' > /tmp/email-template.html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)">
  <tr><td style="background:#1e3a5f;padding:28px 32px;text-align:center">
    <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700">Athena Language School</h1>
    <p style="margin:6px 0 0;color:#94a3b8;font-size:13px">Weekly Health Check</p>
  </td></tr>
  <tr><td style="padding:24px 32px 0">
    <p style="margin:0 0 16px;color:#64748b;font-size:13px">__DATE__</p>
    <div style="background:__OC__;color:#fff;padding:12px 20px;border-radius:8px;font-size:15px;font-weight:600;text-align:center;margin-bottom:24px">__OVERALL__</div>
  </td></tr>
  <tr><td style="padding:0 32px">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      <tr style="background:#f8fafc">
        <td style="padding:10px 16px;border-bottom:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#475569">Page</td>
        <td style="padding:10px 16px;border-bottom:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#475569;text-align:center">Status</td>
      </tr>
      <tr><td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:14px;color:#334155">Homepage</td><td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;text-align:center"><span style="background:__HP_COLOR__;color:#fff;font-size:12px;font-weight:700;padding:2px 10px;border-radius:10px">__HP__</span></td></tr>
      <tr style="background:#fafafa"><td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:14px;color:#334155">Admin</td><td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;text-align:center"><span style="background:__AD_COLOR__;color:#fff;font-size:12px;font-weight:700;padding:2px 10px;border-radius:10px">__AD__</span></td></tr>
      <tr><td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:14px;color:#334155">Grammar Game</td><td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;text-align:center"><span style="background:__GR_COLOR__;color:#fff;font-size:12px;font-weight:700;padding:2px 10px;border-radius:10px">__GR__</span></td></tr>
      <tr style="background:#fafafa"><td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:14px;color:#334155">Sitemap</td><td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;text-align:center"><span style="background:__SI_COLOR__;color:#fff;font-size:12px;font-weight:700;padding:2px 10px;border-radius:10px">__SI__</span></td></tr>
      <tr><td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:14px;color:#334155">robots.txt</td><td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;text-align:center"><span style="background:__RO_COLOR__;color:#fff;font-size:12px;font-weight:700;padding:2px 10px;border-radius:10px">__RO__</span></td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:20px 32px 0">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fefce8;border:1px solid #fde68a;border-radius:8px">
      <tr><td style="padding:12px 16px;font-size:13px;color:#92400e"><strong>SSL Certificate</strong> &mdash; Expires: __SSL__</td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:24px 32px 28px;text-align:center;border-top:1px solid #e2e8f0;margin-top:24px">
    <p style="margin:0;font-size:12px;color:#94a3b8">Athena Language School &middot; 123athena.com</p>
    <p style="margin:4px 0 0;font-size:11px;color:#cbd5e1">Automated health check &mdash; every Monday 9:00 AM Taiwan time</p>
  </td></tr>
</table>
</td></tr></table>
</body>
</html>
HTMLTEMPLATE

# Determine badge colors
GREEN="#16a34a"
RED="#dc2626"

[ "$HP" = "200" ] && HP_C="$GREEN" || HP_C="$RED"
[ "$AD" = "200" ] && AD_C="$GREEN" || AD_C="$RED"
[ "$GR" = "200" ] && GR_C="$GREEN" || GR_C="$RED"
[ "$SI" = "200" ] && SI_C="$GREEN" || SI_C="$RED"
[ "$RO" = "200" ] && RO_C="$GREEN" || RO_C="$RED"

# Replace placeholders
sed -e "s|__DATE__|$DATE|g" \
    -e "s|__OVERALL__|$OVERALL|g" \
    -e "s|__OC__|$OC|g" \
    -e "s|__HP__|$HPB|g" -e "s|__HP_COLOR__|$HP_C|g" \
    -e "s|__AD__|$ADB|g" -e "s|__AD_COLOR__|$AD_C|g" \
    -e "s|__GR__|$GRB|g" -e "s|__GR_COLOR__|$GR_C|g" \
    -e "s|__SI__|$SIB|g" -e "s|__SI_COLOR__|$SI_C|g" \
    -e "s|__RO__|$ROB|g" -e "s|__RO_COLOR__|$RO_C|g" \
    -e "s|__SSL__|$SSL|g" \
    /tmp/email-template.html > /tmp/email.html

# Output as JSON-safe string for curl
python3 -c "
import json
with open('/tmp/email.html') as f:
    html = f.read()
print(json.dumps(html))
" > /tmp/email-json.txt
