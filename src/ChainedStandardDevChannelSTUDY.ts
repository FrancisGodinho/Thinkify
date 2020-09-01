declare upper;

input FirstStdDev = 1;
input SecondStdDev = 2;
input Price = close;
input PlotCenterLines = yes;
input PlotUpperLines = yes;

def regression = InertiaAll(price);
def stdDeviation = StDevAll(price);

#
# plot all values 
#
plot firstUpperLine = regression + stdDeviation;
plot firstLowerLine = regression - stdDeviation;
plot secondUpperLine = regression + 2 * stdDeviation;
plot secondLowerLine = regression - 2 * stdDeviation;
plot middleLine = regression;

#
# set properties
#
firstUpperLine.SetDefaultColor(Color.ORANGE);
firstLowerLine.SetDefaultColor(Color.ORANGE);
secondUpperLine.SetDefaultColor(Color.UPTICK);
secondLowerLine.SetDefaultColor(Color.UPTICK);
middleLine.SetDefaultColor(Color.WHITE);

secondUpperLine.SetHiding(!PlotUpperLines); 
secondLowerLine.SetHiding(!PlotUpperLines); 

#
# plot dotted lines
#
plot line1 = regression + 1.5 * stdDeviation;
plot line2 = regression + 0.5 * stdDeviation;
plot line3 = regression - 0.5 * stdDeviation;
plot line4 = regression - 1.5 * stdDeviation;

line1.SetDefaultColor(Color.WHITE);
line2.SetDefaultColor(Color.WHITE);
line3.SetDefaultColor(Color.WHITE);
line4.SetDefaultColor(Color.WHITE);

line1.SetHiding(!PlotCenterLines or !PlotUpperLines); 
line2.SetHiding(!PlotCenterLines); 
line3.SetHiding(!PlotCenterLines); 
line4.SetHiding(!PlotCenterLines or !PlotUpperLines);  

line1.SetStyle(Curve.SHORT_DASH);
line2.SetStyle(Curve.SHORT_DASH);
line3.SetStyle(Curve.SHORT_DASH);
line4.SetStyle(Curve.SHORT_DASH);
