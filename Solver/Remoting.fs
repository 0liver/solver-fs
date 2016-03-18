namespace Solver

open WebSharper
open MathParser

module Server =

    let solve (equation: string) =
        let compare (sides:string[]) =
            match sides.Length with
            | 0 | 1 -> false
            | _ ->
                let parser = MathParser()
                let left = sides.[0]
                let right = sides.[1]
                try
                    parser.Parse(left) = parser.Parse(right)
                with
                    | Failure _ -> false

        equation
            .Replace("−", "-")
            .Replace("×", "*")
            .Replace("÷", "/")
            .Split([|'='|])
        |> compare

    [<Rpc>]
    let IsSolution input = 
        async {
            return solve input
        }
