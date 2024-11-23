from flask import Flask, render_template, request
from heartrateFluctuations import display_plots
from sleepPatterns import display_sleep_patterns
from trends import display_trends

app = Flask(__name__, template_folder='application/templates')
app.config['TEMPLATES_AUTO_RELOAD'] = True
app._static_folder = 'application/static'

@app.route('/', methods=['GET', 'POST'])
def index():
    plot_lr, plot_rf = None, None
    user_id = None

    if request.method == 'POST':
        # Get User ID from form submission
        user_id = int(request.form.get('user_id'))

        # Generate plots for the given User ID
        plot_lr, plot_rf = display_plots(user_id)

    # Pass plots and User ID to the template
    return render_template('index.html', plot_lr=plot_lr, plot_rf=plot_rf, user_id=user_id)

@app.route("/tab1")
def tab1():
    display_sleep_patterns()
    return render_template("tab1.html")

@app.route("/tab2")
def tab2():
    display_trends()
    return render_template("tab2.html")

if __name__ == '__main__':
    app.run(debug=True)
