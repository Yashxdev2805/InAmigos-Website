#!/bin/bash
# ==============================================================================
# InAmigos Foundation - Phase 1 Emergency Firewall & Port Lockdown Script
# Purpose: Remediate P0 network vulnerabilities found in Nmap scan:
#          - Exposed MySQL Port 3306 (Medium)
#          - Exposed Plaintext FTP Port 21 (Medium)
#          - Exposed Unstandardized Port 65002 (Medium)
# ==============================================================================

echo "========================================================="
echo "   InAmigos Foundation - Emergency Port Lockdown (P0)"
echo "========================================================="

# Check root privileges
if [ "$EUID" -ne 0 ]; then
  echo "[-] ERROR: This script must be run as root (sudo)."
  exit 1
fi

echo "[+] Step 1: Restricting MySQL (Port 3306) to Localhost (127.0.0.1) only..."
iptables -A INPUT -p tcp -s 127.0.0.1 --dport 3306 -j ACCEPT
iptables -A INPUT -p tcp --dport 3306 -j DROP
echo "[V] Port 3306 blocked from public internet."

echo "[+] Step 2: Closing Plaintext FTP (Port 21)..."
iptables -A INPUT -p tcp --dport 21 -j DROP
echo "[V] Port 21 blocked. Use SFTP/SSH over Port 22 instead."

echo "[+] Step 3: Blocking Unstandardized Management Port 65002..."
iptables -A INPUT -p tcp --dport 65002 -j DROP
iptables -A INPUT -p udp --dport 65002 -j DROP
echo "[V] Port 65002 blocked."

echo "[+] Step 4: Allowing Standard Secure Web Ports (80, 443, 22)..."
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Save iptables configuration if iptables-persistent is installed
if command -v netfilter-persistent &> /dev/null; then
    netfilter-persistent save
    echo "[V] Persistent firewall rules saved."
fi

# UFW fallback execution if UFW is active
if command -v ufw &> /dev/null; then
    echo "[+] Applying UFW Firewall Rules..."
    ufw deny 3306/tcp
    ufw deny 21/tcp
    ufw deny 65002/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 22/tcp
    ufw reload
    echo "[V] UFW rules updated and reloaded."
fi

echo "========================================================="
echo " [SUCCESS] Phase 1 Emergency Port Lockdown Complete!"
echo " Ports 3306, 21, and 65002 are now strictly blocked."
echo "========================================================="
