import nodemailer from "nodemailer";

export const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
  from: `"Mora AI Terminal" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "PROTOCOL_ALPHA: Neural Link Verification",
  html: `
    <div style="background-color: #020617; background-image: radial-gradient(circle at top right, #1e1b4b 0%, #020617 100%), repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(34, 211, 238, 0.03) 1px, rgba(34, 211, 238, 0.03) 2px); background-size: 100% 100%, 100% 4px; color: #f8fafc; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 60px 20px; max-width: 600px; margin: auto; border: 1px solid #1e293b; position: relative; overflow: hidden;">
      
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #22d3ee, #f472b6, transparent); opacity: 0.8;"></div>

      <div style="text-align: center; margin-bottom: 50px; position: relative;">
        <div style="margin: 0 auto; width: fit-content; padding: 15px 40px; border-left: 1px solid #f472b6; border-right: 1px solid #22d3ee; background: rgba(15, 23, 42, 0.8); position: relative; box-shadow: 0 0 30px rgba(34, 211, 238, 0.1);">
          <div style="position: absolute; top: 0; left: 0; width: 8px; height: 8px; border-top: 2px solid #22d3ee; border-left: 2px solid #22d3ee;"></div>
          <div style="position: absolute; bottom: 0; right: 0; width: 8px; height: 8px; border-bottom: 2px solid #f472b6; border-right: 2px solid #f472b6;"></div>
          
          <h1 style="margin: 0; font-size: 28px; letter-spacing: 16px; color: #ffffff; text-transform: uppercase; font-weight: 900; text-shadow: 0 0 15px rgba(34, 211, 238, 0.8);">Mora AI</h1>
        </div>
        <p style="color: #22d3ee; font-size: 10px; letter-spacing: 6px; margin-top: 20px; font-family: 'Courier New', monospace; text-transform: uppercase; font-weight: bold; opacity: 0.9;">
          <span style="color: #f472b6;">●</span> NEURAL_SYNC_MODE_ACTIVE
        </p>
      </div>

      <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255, 255, 255, 0.05); padding: 40px; position: relative; border-radius: 2px;">
        
        <div style="font-size: 11px; color: #94a3b8; font-family: 'Courier New', monospace; margin-bottom: 35px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px;">
          <span style="color: #22d3ee;">[SYSTEM]</span> NODE_ID: MORA-${Math.floor(Math.random()*9999)} <br>
          <span style="color: #f472b6;">[AUTH]</span> INJECTING_SECURITY_FRAGMENTS...
        </div>

        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.8; margin-bottom: 35px; letter-spacing: 0.5px; text-align: center;">
          A secure gateway has been initialized. Synchronize your neural pattern using the temporal key below:
        </p>

        <div style="text-align: center; margin: 45px 0; position: relative;">
          <div style="display: inline-block; background: #000000; padding: 40px 60px; border: 1px solid rgba(34, 211, 238, 0.4); position: relative; box-shadow: 0 0 50px rgba(34, 211, 238, 0.15), inset 0 0 20px rgba(244, 114, 182, 0.1);">
            <div style="position: absolute; top: -1px; left: 20%; right: 20%; height: 1px; background: #f472b6;"></div>
            <div style="position: absolute; bottom: -1px; left: 20%; right: 20%; height: 1px; background: #22d3ee;"></div>

            <h2 style="font-size: 58px; margin: 0; color: #ffffff; letter-spacing: 18px; font-family: 'Courier New', monospace; text-shadow: 0 0 10px #ffffff, 3px 0 15px rgba(34, 211, 238, 0.8), -3px 0 15px rgba(244, 114, 182, 0.8);">${otp}</h2>
          </div>
          <p style="font-size: 10px; color: #475569; margin-top: 25px; font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 3px;">TRACK_ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>

        <div style="background: linear-gradient(90deg, rgba(239, 68, 68, 0.1), transparent); border-left: 3px solid #ef4444; padding: 20px; margin-top: 45px;">
          <p style="font-size: 11px; color: #94a3b8; line-height: 1.6; margin: 0;">
            <strong style="color: #ef4444; letter-spacing: 1px;">WARNING:</strong> 
            Key stability is degrading. Connection de-materializes in <span style="color: #ffffff; font-weight: bold;">300s</span>.
          </p>
        </div>
      </div>

      <div style="margin-top: 50px; text-align: center;">
        <div style="height: 1px; width: 100%; background: linear-gradient(to right, transparent, rgba(34, 211, 238, 0.2), transparent); margin-bottom: 25px;"></div>
        <p style="font-size: 8px; color: #334155; font-family: monospace; text-transform: uppercase; letter-spacing: 5px;">
          TERMINAL_OS_MORA // E2E_ENCRYPTED_UPLINK
        </p>
        <p style="font-size: 10px; color: #22d3ee; margin-top: 15px; font-weight: bold; opacity: 0.7;">
          © 2026 Mora AI Systems • Operational Excellence
        </p>
      </div>
    </div>
  `
});
};