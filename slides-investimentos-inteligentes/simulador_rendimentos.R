library(tidyverse)
library(highcharter)
library(widgetframe)

simulacao_investimento <- function(meses, aporte_mensal, rendimento_mensal){
  tibble(Meses = 1:meses,
         `Aplicação mensal` = aporte_mensal) %>% 
    mutate(`Total aplicado` = cumsum(`Aplicação mensal`),
           `Patrimônio total` = accumulate(`Aplicação mensal`,
                                           .f = function(x1,x2) x2 + x1 + x1*rendimento_mensal),
           `Lucro de rendimentos` = `Patrimônio total` - `Total aplicado`) %>% 
    select(Meses, `Patrimônio total`, `Lucro de rendimentos`,
           `Total aplicado`) %>% 
    gather("variavel", "R$", - Meses) %>% 
    mutate(`R$` = round(`R$`, 2)) %>% 
    hchart(., "line", hcaes(x = Meses, y = `R$`, group = "variavel")) %>% 
    hc_title(
      text = paste0("Simulação de investimento por ", meses ," meses ",
                   "(", round(meses/12, 1) ," anos)")
    ) %>% 
    hc_subtitle(
      text = paste("Considerando aportes mensais de R$", format(aporte_mensal,
                                                                big.mark = '.',
                                                                decimal.mark = ','),
                   "e rendimento de", scales::percent(rendimento_mensal,
                                                      decimal.mark = ',',
                                                      accuracy = .01),
                   "ao mês.")
    ) 
  
}


simulacao_investimento(240, aporte_mensal = 4000, rendimento_mensal = .1/12)


