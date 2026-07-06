from flask import Flask, render_template_string, request, redirect, url_for, session, flash
from datetime import datetime, timedelta
import werkzeug.security as ws

app = Flask(__name__)
app.secret_key = "pakistan_earning_secure_key_123"

# Temporary Databases (Real production me SQL Database use hoga)
USERS = {}
CLICKS_LOG = {"direct_link": {}, "ptc_ads": {}}
USER_STATS = {} # Format: {username: {"direct_clicks": 0, "ptc_clicks": 0}}

# --- HTML Templates (For Scanning & UI) ---
BASE_LAYOUT = """
<!DOCTYPE html>
<html>
<head>
    <title>Earning Platform</title>
    <link rel="stylesheet" href="https://jsdelivr.net">
</head>
<body class="bg-light">
    <div class="container mt-5">
        {% with messages = get_flashed_messages() %}
          {% if messages %}
            {% for message in messages %}
              <div class="alert alert-info">{{ message }}</div>
            {% endfor %}
          {% endif %}
        {% endwith %}
        {% block content %}{% endblock %}
    </div>
</body>
</html>
"""

@app.route('/')
def home():
    if 'username' in session:
        return redirect(url_for('dashboard'))
    return render_template_string(BASE_LAYOUT + """
    {% block content %}
    <div class="text-center">
        <h1>Welcome to Traffic Platform</h1>
        <a href="/register" class="btn btn-primary m-2">Create Account</a>
        <a href="/login" class="btn btn-success m-2">Login</a>
    </div>
    {% endblock %}
    """)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        user = request.form['username']
        password = request.form['password']
        if user in USERS:
            flash("Username already exists!")
            return redirect(url_for('register'))
        USERS[user] = ws.generate_password_hash(password)
        USER_STATS[user] = {"direct_clicks": 0, "ptc_clicks": 0}
        flash("Account created successfully! Please login.")
        return redirect(url_for('login'))
    
    return render_template_string(BASE_LAYOUT + """
    {% block content %}
    <div class="card p-4 mx-auto" style="max-width: 400px;">
        <h3>Create Account</h3>
        <form method="POST">
            <input type="text" name="username" class="form-control mb-2" placeholder="Username" required>
            <input type="password" name="password" class="form-control mb-2" placeholder="Password" required>
            <button class="btn btn-primary w-100">Register</button>
        </form>
    </div>
    {% endblock %}
    """)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = request.form['username']
        password = request.form['password']
        if user in USERS and ws.check_password_hash(USERS[user], password):
            session['username'] = user
            return redirect(url_for('dashboard'))
        flash("Invalid Credentials!")
    return render_template_string(BASE_LAYOUT + """
    {% block content %}
    <div class="card p-4 mx-auto" style="max-width: 400px;">
        <h3>Login</h3>
        <form method="POST">
            <input type="text" name="username" class="form-control mb-2" placeholder="Username" required>
            <input type="password" name="password" class="form-control mb-2" placeholder="Password" required>
            <button class="btn btn-success w-100">Login</button>
        </form>
    </div>
    {% endblock %}
    """)

@app.route('/dashboard')
def dashboard():
    if 'username' not in session:
        return redirect(url_for('login'))
    user = session['username']
    stats = USER_STATS.get(user, {"direct_clicks": 0, "ptc_clicks": 0})
    # Generating dynamic unique link for user
    share_link = request.url_root + f"visit/direct/{user}"
    ptc_link = request.url_root + f"visit/ptc/{user}"
    
    return render_template_string(BASE_LAYOUT + """
    {% block content %}
    <div class="card p-4">
        <h2>Welcome, {{ user }}! <a href="/logout" class="btn btn-danger btn-sm float-end">Logout</a></h2>
        <hr>
        <div class="row text-center mb-4">
            <div class="col-md-6"><div class="p-3 bg-white border rounded"><h4>Direct Link Clicks</h4><h3>{{ stats.direct_clicks }}</h3></div></div>
            <div class="col-md-6"><div class="p-3 bg-white border rounded"><h4>PTC Ads Clicks</h4><h3>{{ stats.ptc_clicks }}</h3></div></div>
        </div>
        <h5>🔗 Your Direct Link (1 Click per IP / 24 Hours):</h5>
        <input type="text" class="form-control mb-3" value="{{ share_link }}" readonly>
        
        <h5>📺 Your PTC Ad Link (1 Click per IP / 2 Hours):</h5>
        <input type="text" class="form-control mb-3" value="{{ ptc_link }}" readonly>
    </div>
    {% endblock %}
    """, user=user, stats=stats, share_link=share_link, ptc_link=ptc_link)

# --- TRACKING ENGINE CONTROLLER ---
@app.route('/visit/<link_type>/<username>')
def track_click(link_type, username):
    if username not in USER_STATS:
        return "Invalid User Link", 404
        
    user_ip = request.remote_addr # Captures Visitor IP
    now = datetime.now()
    
    if link_type == "direct":
        # Logic: 24 Hours Check
        last_click = CLICKS_LOG["direct_link"].get(user_ip)
        if last_click and (now - last_click) < timedelta(hours=24):
            return "Direct Link: 1 Click allowed per 24 hours from this IP.", 403
        
        CLICKS_LOG["direct_link"][user_ip] = now
        USER_STATS[username]["direct_clicks"] += 1
        return "Thank you! Your Direct Link visit has been counted successfully."
        
    elif link_type == "ptc":
        # Logic: 2 Hours Check
        last_click = CLICKS_LOG["ptc_ads"].get(user_ip)
        if last_click and (now - last_click) < timedelta(hours=2):
            return "PTC Ads: 1 Click allowed per 2 hours from this IP.", 403
            
        CLICKS_LOG["ptc_ads"][user_ip] = now
        USER_STATS[username]["ptc_clicks"] += 1
        return "Thank you! Your PTC Ad view has been counted successfully."

    return "Invalid Request", 400

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
