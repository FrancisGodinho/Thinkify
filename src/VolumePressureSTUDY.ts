declare lower;

input ShowCurrentVol = yes;
input ShowSellVolumePercent = yes;
input ShowBuyVolumePercent = yes;
input ShowAverage = yes;
input AverageLength = 30;

def sellingVol = volume * (high - close) / (high - low);
def buyingVol = volume * (close - low) / (high - low);

#
# plot selling volume
#
Plot SellVol = sellingVol;
SellVol.setPaintingStrategy(PaintingStrategy.Histogram);
SellVol.SetDefaultColor(Color.DOWNTICK);
SellVol.HideTitle();
SellVol.HideBubble();
SellVol.SetLineWeight(4);

#
# plot buying volume (total volume)
#
Plot BuyVol = volume;
BuyVol.setPaintingStrategy(PaintingStrategy.Histogram);
BuyVol.SetDefaultColor(Color.UPTICK);
BuyVol.HideTitle();
BuyVol.HideBubble();
BuyVol.SetLineWeight(4);

#
# info bar
#
def averageVol = (fold i = 1 to AverageLength + 1 with p = 0 do p + volume[i]) / AverageLength;
def sellPercent = Round((sellingVol / Volume) * 100, 0);
def buyPercent = Round((buyingVol / Volume) * 100, 0);

AddLabel(ShowAverage, AverageLength + " Bar Avg: " + Round(averageVol, 0), Color.LIGHT_GRAY);
AddLabel(ShowCurrentVol, "Curr Vol: " + volume, (if volume > averageVol then 
													Color.UPTICK 
												else if volume < averageVol then 
													Color.DOWNTICK 
												else 
													Color.LIGHT_GRAY));
AddLabel(ShowBuyVolumePercent, "Buy: " + buyPercent + "%", Color.UPTICK);
AddLabel(ShowSellVolumePercent, "Sell: " + sellPercent + "%", Color.DOWNTICK);
